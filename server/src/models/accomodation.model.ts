import { Schema, models, model, Document } from 'mongoose';

import { AccomodationInterface } from '../types';

const AccomodationSchema = new Schema<AccomodationInterface>({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: [{ type: String }],
  description: { type: String, required: true },
  amenities: [
    {
      name: { type: String, required: true },
      is_available: { type: Boolean, default: false },
    },
  ],
  extraInfo: { type: String },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  maxGuests: { type: Number, default: 1, required: true },
  price: { type: Number, default: 1, required: true },
});

// check if model already exists, else we creat new
const Accomodation =
  models.Accomodation || model('Accomodation', AccomodationSchema);

export { Accomodation };
