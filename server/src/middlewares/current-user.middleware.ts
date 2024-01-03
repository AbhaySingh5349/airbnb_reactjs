import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { catchAsync } from './index';
import { jwt_obj } from '../config/env';
import { CustomRequest } from '../types/types';
import { BadRequestError } from '../errors/index';
import { getUserById } from '../services/index';

const verifyToken = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    // retrieving token
    let token;

    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log('token from authorization header: ', token);
    } else if (req.cookies?.jwt_access_cookie) {
      token = req.cookies.jwt_access_cookie.value;
      console.log('token from cookie: ', token);
    } else if (req.session?.jwt) {
      token = req.session?.jwt;
      console.log('token from session: ', token);
    }

    if (!token) {
      req.currentUser = null;
      req.authMessage = 'Authorization Header and Cookies not found';

      throw new BadRequestError(
        'You are not logged-in, Please login to get access'
      );
    } else {
      // Verify Token
      const decoded = jwt.verify(token, jwt_obj.secret!) as jwt.JwtPayload;
      console.log('decoded: ', decoded);

      // Verify if user still exists or user changed password after token was issued
      const user = await getUserById({ userId: decoded?.id });

      if (!user) {
        req.currentUser = null;
        req.authMessage = user
          ? 'Password changed since previous login. Please login again'
          : 'User not found';

        throw new BadRequestError(req.authMessage);
      } else {
        req.currentUser = user;
        req.authMessage = 'User validated';
      }
    }

    next();
  }
);

export { verifyToken };
