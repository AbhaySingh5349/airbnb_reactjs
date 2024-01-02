import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/index';

type ValidateValuesType = ((
  req: Request,
  res: Response,
  next: NextFunction
) => void)[];

const reqValidationErrors = (validateValues: ValidateValuesType) => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log('ERROR IN VALIDATION: ', errors.array());
        throw new RequestValidationError(errors.array());
      }
      next();
    },
  ];
};

const validateRegisterInput = reqValidationErrors([
  body('username').trim().notEmpty().withMessage('username is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 4, max: 20 })
    .withMessage('password must be at least 4 and max 20 characters long'),
  body('confirm_password')
    .trim()
    .notEmpty()
    .withMessage('confirm password is required')
    .isLength({ min: 4, max: 20 })
    .withMessage(
      'confirm password must be at least 4 and max 20 characters long'
    )
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
]);

export { reqValidationErrors, validateRegisterInput };
