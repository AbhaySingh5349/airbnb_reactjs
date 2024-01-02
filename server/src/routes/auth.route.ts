import express from 'express';

import { register } from '../controllers/index';
import { validateRegisterInput } from '../middlewares/index';

const router = express.Router();

router.post('/register', validateRegisterInput, register);

export { router };
