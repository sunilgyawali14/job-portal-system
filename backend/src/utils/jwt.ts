import jwt from 'jsonwebtoken';
import { Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
const REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export interface JwtPayload {
  userId: string;
  email: string;
  role?: Role | undefined;
}

// ── Access Token ──────────────────────────────────────────────────────────────

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};

// Keep backward-compatible alias
export const generateToken = generateAccessToken;

// ── Refresh Token ─────────────────────────────────────────────────────────────

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN } as jwt.SignOptions);
};

// ── Verify any token (access or refresh) ──────────────────────────────────────

export const verifyToken = (token: string): JwtPayload => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & JwtPayload;
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role ?? undefined,
    };
  } catch {
    throw new Error('Invalid or expired token');
  }
};

// ── Helper: parse duration string (e.g. "7d") into milliseconds ───────────────

const multipliers: Record<string, number> = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
};

function parseDurationMs(duration: string): number {
  const match = duration.match(/^(\d+)([dhms])$/);
  if (!match) return 7 * 24 * 60 * 60 * 1000; // fallback 7 days

  const m1 = match[1];
  const m2 = match[2];
  if (!m1 || !m2) return 7 * 24 * 60 * 60 * 1000;

  const value = parseInt(m1, 10);
  const unit = m2;

  return value * (multipliers[unit] ?? 24 * 60 * 60 * 1000);
}

// ── Helper: get a Date object for refresh token expiry ────────────────────────

export const getRefreshTokenExpiryDate = (): Date => {
  return new Date(Date.now() + parseDurationMs(REFRESH_TOKEN_EXPIRES_IN));
};

// ── Helper: get refresh token max-age in milliseconds (for cookies) ───────────

export const getRefreshTokenMaxAgeMs = (): number => {
  return parseDurationMs(REFRESH_TOKEN_EXPIRES_IN);
};