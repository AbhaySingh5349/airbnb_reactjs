import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { CustomErrorClass } from '../errors/index';

// goal is to send very consistently structured err message
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('IN ERROR HANDLER: ', err);
  if (err instanceof CustomErrorClass) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (err.name === 'TokenExpiredError') {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ errors: [{ message: 'Session expired, Please login' }] });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errors: [{ message: 'something went wrong' }] });
};

export { errorHandler };

/*
{
  type: 'field',
  value: 'a@gmail.',
  msg: 'invalid email format',
  path: 'email',
  location: 'body'
}
*/

// common response structure
/*{
    errors:{
        message: string,
        field?: string
    }[]
} 
*/
/* we need to do "implements CustomError" for each Error class we created or we can use Abstract class
interface CustomError{
    statusCode: number;
    serializeErrors():{
        message: string,
        field?: string
    }[]
  }
*/
