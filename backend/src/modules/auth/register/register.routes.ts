import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { registerController } from './register.controller.js';

const router: ExpressRouter = Router();

router.post('/register', registerController);

export default router;