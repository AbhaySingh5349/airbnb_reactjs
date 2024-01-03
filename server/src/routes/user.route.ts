import express from 'express';

import { getUserInfoByToken } from '../controllers/index';

const router = express.Router();

router.get('/profile', getUserInfoByToken);

export { router };
