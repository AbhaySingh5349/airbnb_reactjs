import { StatusCodes } from 'http-status-codes';

import { CustomErrorClass } from './index';

export class DBConnectionError extends CustomErrorClass {
  public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  public reason: string = 'Error Connecting to DB';

  constructor() {
    super('Error Connecting to DB');

    // since we are extending built in class
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
