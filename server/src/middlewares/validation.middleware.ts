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

const validateLoginInput = reqValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').trim().notEmpty().withMessage('password is required'),
]);

const validateAccomodationInput = reqValidationErrors([
  body('title')
    .trim()
    .notEmpty()
    .withMessage('title is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('title must be at least 3 characters & max 50 characters'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('address is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('address must be at least 3 characters & max 50 characters'),
  body('photos')
    .isArray({ min: 1, max: 5 })
    .withMessage('add photos in range of 1 to 5')
    .custom((value) =>
      value.every((element: any) => typeof element === 'string')
    )
    .withMessage('all elements must be strings'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('description is required')
    .isLength({ min: 3, max: 50 })
    .withMessage(
      'description must be at least 3 characters & max 50 characters'
    ),
  body('has_wifi').notEmpty().isBoolean(),
  body('has_tv').notEmpty().isBoolean(),
  body('has_breakfast_included').notEmpty().isBoolean(),
  body('has_terrace_club').notEmpty().isBoolean(),
  body('has_pets_allowed').notEmpty().isBoolean(),
  body('has_free_parking').notEmpty().isBoolean(),
  body('extraInfo').optional(),
  body('checkIn') // yyyy-mm-dd
    .notEmpty()
    .isISO8601()
    .withMessage('enter valid checkin date')
    .custom((value) => {
      console.log('checkin value: ', value);
      if (new Date(value) < new Date()) {
        throw new Error(
          'Enter a valid check-in date that is greater than today'
        );
      }
      return true;
    }),
  body('checkOut') // yyyy-mm-dd
    .notEmpty()
    .isISO8601()
    .withMessage('enter valid checkout date')
    .custom((value, { req }) => {
      if (new Date(value) < new Date()) {
        throw new Error(
          'Enter a valid check-out date that is greater than today'
        );
      }

      if (new Date(value) <= new Date(req.body.checkIn)) {
        throw new Error('Check-out date must be after the check-in date');
      }
      return true;
    }),
  body('maxGuests')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('enter min guest count of 1'),
  body('price')
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage('enter min price of $1/night per person'),
]);

export {
  reqValidationErrors,
  validateRegisterInput,
  validateLoginInput,
  validateAccomodationInput,
};
