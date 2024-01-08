import { Document } from 'mongoose';
import { Request } from 'express';

export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  confirm_password?: string | undefined;
  joinedAt: Date;
}

export interface AccomodationInterface extends Document {
  owner: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
  title: string;
  address: string;
  photos: string[];
  description: string;
  amenities: {
    name: string;
    is_available: boolean;
  }[];
  extraInfo: string;
  checkIn: Date;
  checkOut: Date;
  maxGuests: number;
  price: number;
}

export interface BookingInterface extends Document {
  accomodation: { type: mongoose.Schema.Types.ObjectId; ref: 'Accomodation' };
  guest: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
  checkIn: Date;
  checkOut: Date;
  guestCount: number;
  name: string;
  phone: number;
  price: number;
}

export interface GenerateTokenParams {
  userId: string;
  tokenExpires?: number;
  tokenType?: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface CustomRequest extends Request {
  currentUser?: UserInterface | null;
  authMessage?: string;
}

/*
 [
  {
    fieldname: 'photos',
    originalname: 'download (1).jpeg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    destination: 'D:\\react_projects_2024\\airbnb\\server\\images',
    filename: '5536c08b32c3d6f7756b8b9ae9ec4a74',
    path: 'D:\\react_projects_2024\\airbnb\\server\\images\\5536c08b32c3d6f7756b8b9ae9ec4a74',
    size: 12019
  },
  {...}
]
  */

export interface SystemImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
