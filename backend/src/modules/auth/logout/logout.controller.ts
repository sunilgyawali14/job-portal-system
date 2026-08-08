import type { Request, Response, NextFunction } from 'express';
import { logoutService } from './logout.service.js';

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Read the refresh token from HttpOnly cookie
    const refreshToken = req.cookies?.refreshToken;

    // 2. Invalidate it in the database
    await logoutService.logout(refreshToken);

    // 3. Clear the cookie
    res
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })
      .status(200)
      .json({
        success: true,
        message: 'Logged out successfully',
      });
  } catch (error) {
    next(error);
  }
};
