import { StatusCodes } from 'http-status-codes';

import { CustomErrorClass } from './index';

export class BadRequestError extends CustomErrorClass {
  public statusCode: number = StatusCodes.BAD_REQUEST;

  constructor(public message: string) {
    super(message);

    // since we are extending built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
