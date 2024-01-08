import express from 'express';

import { addNewBooking, getMyBookings } from '../controllers';
import { verifyToken, validateBookingInput } from '../middlewares';

const router = express.Router();

router.post('/', verifyToken, validateBookingInput, addNewBooking);
router.get('/', verifyToken, getMyBookings);

export { router };
