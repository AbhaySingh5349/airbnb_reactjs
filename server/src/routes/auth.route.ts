import express from 'express';

import { register, login } from '../controllers/index';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middlewares/index';

const router = express.Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);

export { router };
