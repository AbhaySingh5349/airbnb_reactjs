import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { catchAsync } from '../middlewares/index';
import { CustomRequest } from '../types';
import { Booking } from '../models';

const addNewBooking = catchAsync(async (req: CustomRequest, res: Response) => {
  const { accomodationId, checkIn, checkOut, guestCount, name, phone, price } =
    req.body;

  const booking = await Booking.create({
    accomodation: accomodationId,
    guest: req.currentUser?._id,
    checkIn,
    checkOut,
    guestCount,
    name,
    phone,
    price,
  });

  return res
    .status(StatusCodes.CREATED)
    .json({ booking, msg: 'new booking created' });
});

export { addNewBooking };
