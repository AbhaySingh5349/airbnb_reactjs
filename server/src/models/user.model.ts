import { Schema, models, model } from 'mongoose';

import { UserInterface } from '../types';
import { PasswordManager } from '../services/index';

const UserSchema = new Schema<UserInterface>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // not exposing hashed password for any end-point other than /register (handled in code while token generation), for other we need to do: query.select('+password')
  password: { type: String, select: false },
  confirm_password: { type: String },
  joinedAt: { type: Date, default: Date.now },
});

// DOCUMENT MIDDLEWARE (this object points to document, do not work with update)
UserSchema.pre('save', async function (next) {
  // check if password was actually modified otherwise we will hash already hashed password
  if (!this.isModified('password')) return next();

  this.password = await PasswordManager.generateHash(this.password);
  this.confirm_password = undefined;
});

// check if model already exists, else we create new
const User = models.User || model('User', UserSchema);

export { User };
