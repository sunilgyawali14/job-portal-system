import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { logoutController } from './logout.controller.js';

const router: ExpressRouter = Router();

router.post('/logout', logoutController);

export default router;
