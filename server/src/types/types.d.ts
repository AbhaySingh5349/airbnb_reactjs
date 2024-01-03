import { Document } from 'mongoose';
import { Request } from 'express';

export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  confirm_password?: string | undefined;
  joinedAt: Date;
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
