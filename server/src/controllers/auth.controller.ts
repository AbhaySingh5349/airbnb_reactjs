import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models/user.model';
import { BadRequestError } from '../errors/index';
import { catchAsync } from '../middlewares/index';

const register = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError('email already exists');

  const user = await User.create({ username, email, password });

  return res.status(StatusCodes.CREATED).json({ user, msg: 'user created' });
});

export { register };
