import type { Request, Response, NextFunction } from 'express';
import { registerService } from './register.service.js';
import { registerSchema } from './register.validation.js';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Validate input
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));
      return res.status(400).json({ success: false, errors });
    }

    // 2. Delegate to service
    const { user, token } = await registerService.register(parsed.data);

    // 3. Send response
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(201)
      .json({
        success: true,
        message: 'User registered successfully',
        data: { user },
      });
  } catch (error) {
    next(error);
  }
};