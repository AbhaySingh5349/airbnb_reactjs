import { StatusCodes } from 'http-status-codes';

import { CustomErrorClass } from './index';

export class NotFoundError extends CustomErrorClass {
  public statusCode: number = StatusCodes.NOT_FOUND;

  constructor() {
    super('Route Not found');

    // since we are extending built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Route Not found' }];
  }
}
