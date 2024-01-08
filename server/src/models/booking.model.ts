import { Schema, models, model } from 'mongoose';

import { BookingInterface } from '../types';

const BookingSchema = new Schema<BookingInterface>({
  accomodation: {
    type: Schema.Types.ObjectId,
    ref: 'Accomodation',
    required: true,
  },
  guest: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guestCount: { type: Number, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  price: { type: Number, default: 1, required: true },
});

// check if model already exists, else we create new
const Booking = models.Booking || model('Booking', BookingSchema);

export { Booking };
