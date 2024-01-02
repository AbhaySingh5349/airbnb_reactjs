import { Request, Response, NextFunction } from 'express';

// Return a function that catches and forwards any error a function throws to the next middleware
const catchAsync = (fn: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export { catchAsync };
