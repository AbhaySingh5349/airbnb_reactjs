import express from 'express';

import { register, login } from '../controllers/index';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middlewares/index';

const router = express.Router();

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(validateLoginInput, login);

// router.post('/register', validateRegisterInput, register);
// router.post('/login', validateLoginInput, login);

export { router };
