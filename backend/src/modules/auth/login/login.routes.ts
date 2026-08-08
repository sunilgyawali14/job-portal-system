import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { loginController } from './login.controller.js';
import { refreshController } from './refresh.controller.js';

const router: ExpressRouter = Router();

router.post('/login', loginController);
router.post('/refresh', refreshController);

export default router;
