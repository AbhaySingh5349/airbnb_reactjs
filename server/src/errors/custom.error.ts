// to define all the properties that must be defined by any class that extends "CustomError abstract class"
abstract class CustomErrorClass extends Error {
  abstract statusCode: number;

  constructor(public logMessage: string) {
    super(logMessage);

    // since we are extending built in class
    Object.setPrototypeOf(this, CustomErrorClass.prototype);
  }

  // not defining method but just its signature which returns array of objects
  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}

export { CustomErrorClass };

// super keyword is equivalent to => new Error('');
