import express from 'express';

import { router as authRouter } from './auth.route';

const router = express.Router();

router.use('/auth', authRouter);

export { router };
