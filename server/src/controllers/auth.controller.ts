import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../models/index';
import { BadRequestError } from '../errors/index';
import { catchAsync } from '../middlewares/index';
import { PasswordManager } from '../services/index';
import { generateAuthToken } from '../services/index';

// { "username": "t2", "email": "t2@gmail.com", "password": "abcd", "confirm_password": "abcd" }

const register = catchAsync(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new BadRequestError('email already exists');

  const user = await User.create({ username, email, password });

  return res.status(StatusCodes.CREATED).json({ user, msg: 'user created' });
});

// { "email": "t2@gmail.com", "password": "abcd" }

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  const isValidUser =
    user && (await PasswordManager.compare(user.password, password));

  if (!isValidUser) throw new BadRequestError('invalid credentials');

  const auth = await generateAuthToken({ userId: user._id });

  // store JWT on session object (it got turned into JSON and then base 64 encoded string by cookie session)
  req.session = {
    jwt: auth.access.token.value,
  };

  res.cookie('jwt_access_cookie', auth.access.token, auth.access.cookieOptions);

  return res
    .status(StatusCodes.OK)
    .json({ username: user.username, email, _id: user._id });
});

const logOut = async (req: Request, res: Response) => {
  res.cookie('jwt_access_cookie', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  return res.status(200).json({ msg: 'user loged-out' });
};

export { register, login, logOut };
