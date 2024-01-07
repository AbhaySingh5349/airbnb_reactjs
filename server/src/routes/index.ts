import express from 'express';

import { router as authRouter } from './auth.route';
import { router as userRouter } from './user.route';
import { router as accomodationRouter } from './accomodation.route';
import { router as baseRouter } from './base.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/accomodations', accomodationRouter);
router.use('/', baseRouter);

export { router };
