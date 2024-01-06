import { StatusCodes } from 'http-status-codes';

import { CustomErrorClass } from './index';

export class NotFoundError extends CustomErrorClass {
  public statusCode: number = StatusCodes.NOT_FOUND;

  constructor(public message: string) {
    super(message);

    // since we are extending built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: `${this.message}` }];
  }
}
