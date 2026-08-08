import { loginRepository } from './login.repository.js';
import { comparePassword, hashToken, compareToken } from '../../../utils/hash.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  getRefreshTokenExpiryDate,
} from '../../../utils/jwt.js';
import { ApiError } from '../../../utils/ApiError.js';
import type { LoginInput } from './login.validation.js';
import type { SafeUser } from './login.types.js';

interface LoginResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string; // raw — will be set as HttpOnly cookie by controller
}

interface RefreshResult {
  accessToken: string;
  refreshToken: string; // rotated raw token
}

export class LoginService {
  /**
   * Authenticate user, issue access token + refresh token.
   * The refresh token hash is persisted in the database.
   */
  async login(input: LoginInput): Promise<LoginResult> {
    const { email, password } = input;

    // 1. Find user by email
    const user = await loginRepository.findUserByEmail(email);
    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // 2. Verify password
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    // 3. Generate tokens
    const jwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    // 4. Hash refresh token and store in DB
    const refreshTokenHash = await hashToken(refreshToken);
    await loginRepository.createRefreshToken(
      user.id,
      refreshTokenHash,
      getRefreshTokenExpiryDate()
    );

    // 5. Update last login timestamp
    await loginRepository.updateLastLogin(user.id);

    // 6. Return safe user data + tokens
    const safeUser: SafeUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    return { user: safeUser, accessToken, refreshToken };
  }

  /**
   * Rotate refresh token: verify old token, revoke it, issue new pair.
   * This prevents replay attacks — each refresh token can only be used once.
   */
  async refresh(oldRefreshToken: string): Promise<RefreshResult> {
    // 1. Verify JWT signature & expiry
    let payload;
    try {
      payload = verifyToken(oldRefreshToken);
    } catch {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    // 2. Find all active (non-revoked, non-expired) refresh tokens for this user
    const activeTokens = await loginRepository.findActiveRefreshTokensByUserId(payload.userId);

    if (activeTokens.length === 0) {
      throw new ApiError(401, 'Refresh token not found or already revoked');
    }

    // 3. Find the matching token by comparing hashes
    let matchedTokenRecord = null;
    for (const tokenRecord of activeTokens) {
      const isMatch = await compareToken(oldRefreshToken, tokenRecord.token);
      if (isMatch) {
        matchedTokenRecord = tokenRecord;
        break;
      }
    }

    if (!matchedTokenRecord) {
      // Possible token reuse attack — revoke ALL tokens for this user
      await loginRepository.revokeAllUserRefreshTokens(payload.userId);
      throw new ApiError(401, 'Refresh token reuse detected. All sessions revoked.');
    }

    // 4. Revoke the old token
    await loginRepository.revokeRefreshToken(matchedTokenRecord.id);

    // 5. Issue new token pair
    const jwtPayload = {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    };

    const newAccessToken = generateAccessToken(jwtPayload);
    const newRefreshToken = generateRefreshToken(jwtPayload);

    // 6. Hash and store the new refresh token
    const newRefreshTokenHash = await hashToken(newRefreshToken);
    await loginRepository.createRefreshToken(
      payload.userId,
      newRefreshTokenHash,
      getRefreshTokenExpiryDate()
    );

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}

export const loginService = new LoginService();
