import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { jwt_obj } from '../config/env';
import { getUserById } from '../services/index';
import { catchAsync } from '../middlewares/index';

const getUserInfoByToken = catchAsync(async (req: Request, res: Response) => {
  const { jwt_access_cookie } = req.cookies;
  const token = jwt_access_cookie?.value || null;

  if (token) {
    const decoded = jwt.verify(token, jwt_obj.secret!) as jwt.JwtPayload;
    const user = await getUserById({ userId: decoded?.id });

    const userInfo = {
      username: user.username,
      email: user.email,
      _id: user._id,
    };

    return res.status(StatusCodes.OK).json({ user: userInfo });
  }

  return res.status(StatusCodes.OK).json({ user: null });
});

export { getUserInfoByToken };
