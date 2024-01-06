import express from 'express';

import { getUserInfoByToken } from '../controllers';
import { verifyToken } from '../middlewares';

const router = express.Router();

router.get('/profile', verifyToken, getUserInfoByToken);

export { router };
