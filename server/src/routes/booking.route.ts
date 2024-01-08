import express from 'express';

import { addNewBooking } from '../controllers';
import { verifyToken, validateBookingInput } from '../middlewares';

const router = express.Router();

router.post('/', verifyToken, validateBookingInput, addNewBooking);

export { router };
