import express from 'express';

import { register, login, logOut } from '../controllers/index';
import {
  validateRegisterInput,
  validateLoginInput,
  verifyToken,
} from '../middlewares/index';

const router = express.Router();

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(validateLoginInput, login);
router.post('/logout', verifyToken, logOut);

export { router };
