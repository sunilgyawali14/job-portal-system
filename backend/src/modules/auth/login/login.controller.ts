import type { Request, Response, NextFunction } from 'express';
import { loginService } from './login.service.js';
import { loginSchema } from './login.validation.js';
import { getRefreshTokenMaxAgeMs } from '../../../utils/jwt.js';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Validate input
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return res.status(400).json({ success: false, errors });
    }

    // 2. Delegate to service
    const { user, accessToken, refreshToken } = await loginService.login(parsed.data);

    // 3. Set refresh token as HttpOnly Secure cookie
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
        message: 'Login successful',
        data: {
          user,
          accessToken, // access token in response body for front-end
        },
      });
  } catch (error) {
    next(error);
  }
};
