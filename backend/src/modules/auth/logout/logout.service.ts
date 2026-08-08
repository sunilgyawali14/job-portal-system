import { loginRepository } from '../login/login.repository.js';
import { compareToken } from '../../../utils/hash.js';
import { verifyToken } from '../../../utils/jwt.js';

export class LogoutService {
  /**
   * Invalidate the refresh token:
   * 1. Verify JWT signature to extract userId
   * 2. Find matching token hash in DB
   * 3. Revoke it so it can never be used again
   */
  async logout(rawRefreshToken?: string): Promise<void> {
    if (!rawRefreshToken) {
      // No token to invalidate — just clear the cookie (handled by controller)
      return;
    }

    try {
      const payload = verifyToken(rawRefreshToken);

      // Find all active tokens for this user and revoke the matching one
      const activeTokens = await loginRepository.findActiveRefreshTokensByUserId(payload.userId);

      for (const tokenRecord of activeTokens) {
        const isMatch = await compareToken(rawRefreshToken, tokenRecord.token);
        if (isMatch) {
          await loginRepository.revokeRefreshToken(tokenRecord.id);
          break;
        }
      }
    } catch {
      // Token is invalid/expired — no DB cleanup needed, just clear the cookie
    }
  }

  /**
   * Revoke ALL refresh tokens for a user (force logout from all devices).
   */
  async logoutAll(userId: string): Promise<void> {
    await loginRepository.revokeAllUserRefreshTokens(userId);
  }
}

export const logoutService = new LogoutService();
