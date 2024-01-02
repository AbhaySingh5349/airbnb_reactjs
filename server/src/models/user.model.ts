import { Schema, models, model } from 'mongoose';

import { UserInterface } from '../types/types';

const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

// check if model already exists, else we creat new
const User = models.User || model('User', UserSchema);

export { User };
