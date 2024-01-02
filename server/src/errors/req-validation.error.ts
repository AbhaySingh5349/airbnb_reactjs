import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'express-validator';

import { CustomErrorClass } from './index';

export class RequestValidationError extends CustomErrorClass {
  public statusCode: number = StatusCodes.BAD_REQUEST;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // since we are extending built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if (error.type === 'field') {
        return { message: error.msg, field: error.path };
      }
      return { message: error.msg };
    });
  }
}
