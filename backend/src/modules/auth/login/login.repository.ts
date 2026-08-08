import { prisma } from '../../../config/prisma.js';
import type { UserWithPassword } from './login.types.js';
import type { RefreshToken } from '@prisma/client';

export class LoginRepository {
  async findUserByEmail(email: string): Promise<UserWithPassword | null> {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // ── Refresh Token operations ──────────────────────────────────────────────

  async createRefreshToken(
    userId: string,
    tokenHash: string,
    expiresAt: Date
  ): Promise<RefreshToken> {
    return prisma.refreshToken.create({
      data: {
        token: tokenHash,
        userId,
        expiresAt,
      },
    });
  }

  async findRefreshTokenByHash(tokenHash: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({
      where: { token: tokenHash },
    });
  }

  async findActiveRefreshTokensByUserId(userId: string): Promise<RefreshToken[]> {
    return prisma.refreshToken.findMany({
      where: {
        userId,
        isRevoked: false,
        expiresAt: { gt: new Date() },
      },
    });
  }

  async revokeRefreshToken(id: string): Promise<void> {
    await prisma.refreshToken.update({
      where: { id },
      data: { isRevoked: true },
    });
  }

  async revokeAllUserRefreshTokens(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, isRevoked: false },
      data: { isRevoked: true },
    });
  }

  async deleteRefreshToken(id: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: { id },
    });
  }

  async updateLastLogin(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
    });
  }
}

export const loginRepository = new LoginRepository();
