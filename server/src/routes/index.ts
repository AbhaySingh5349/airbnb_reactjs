import express from 'express';

import { router as authRouter } from './auth.route';
import { router as userRouter } from './user.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export { router };
