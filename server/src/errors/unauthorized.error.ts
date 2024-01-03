import { StatusCodes } from 'http-status-codes';

import { CustomErrorClass } from './index';

export class UnauthorizedError extends CustomErrorClass {
  public statusCode: number = StatusCodes.UNAUTHORIZED;

  constructor(public message: string) {
    super(message);

    // since we are extending built in class
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
