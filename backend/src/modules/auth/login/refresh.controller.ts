import type { Request, Response, NextFunction } from 'express';
import { loginService } from './login.service.js';
import { getRefreshTokenMaxAgeMs } from '../../../utils/jwt.js';

export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Read refresh token from HttpOnly cookie
    const oldRefreshToken = req.cookies?.refreshToken;

    if (!oldRefreshToken) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided',
      });
    }

    // 2. Rotate tokens (verify old → revoke → issue new pair)
    const { accessToken, refreshToken } = await loginService.refresh(oldRefreshToken);

    // 3. Set new refresh token cookie & return new access token
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: getRefreshTokenMaxAgeMs(),
        path: '/',
      })
      .status(200)
      .json({
        success: true,
        message: 'Token refreshed successfully',
        data: { accessToken },
      });
  } catch (error) {
    next(error);
  }
};
