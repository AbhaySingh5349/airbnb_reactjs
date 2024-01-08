import * as z from 'zod';

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(2, 'UserName must be at least 2 characters')
      .max(50, 'UserName exceeds limit of 50 characters'),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email('This is not a valid email.'),
    password: z
      .string()
      .min(4, { message: 'Password should have min 4 characters' })
      .max(20, { message: 'Password should have max 20 characters' }),
    confirm_password: z
      .string()
      .min(4, { message: 'Password should have min 4 characters' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(4, { message: 'Password should have min 4 characters' }),
});

export const AccomodationSchema = z
  .object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title exceeds limit of 50 characters'),
    address: z
      .string()
      .min(3, 'Address must be at least 3 characters')
      .max(50, 'Address exceeds limit of 50 characters'),
    description: z
      .string()
      .min(3, 'Description must be at least 3 characters')
      .max(200, 'Description exceeds limit of 200 characters'),
    has_wifi: z.boolean().default(false),
    has_tv: z.boolean().default(false),
    has_breakfast_included: z.boolean().default(false),
    has_terrace_club: z.boolean().default(false),
    has_pets_allowed: z.boolean().default(false),
    has_free_parking: z.boolean().default(false),
    extraInfo: z.optional(
      z
        .string()
        .max(100, { message: 'Extra info must be fewer than 100 characters' })
    ),
    checkIn: z.coerce.date().refine((date) => date > new Date(), {
      message: 'Date must be in future',
    }),
    checkOut: z.coerce.date().refine((date) => date > new Date(), {
      message: 'Date must be in future',
    }),
    maxGuests: z.coerce
      .number()
      .nonnegative({ message: 'Guest Count must be positive' })
      .min(1, 'Set guest count to least of 1'),
    price: z.coerce
      .number()
      .nonnegative({ message: 'Price must be positive' })
      .min(1, { message: 'Set least price of $1 / person' }),
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: 'Checkout date cannot be earlier than checkin date',
    path: ['checkOut'],
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: 'Checkin date cannot be later than checkout date',
    path: ['checkIn'],
  });

export const BookingSchema = z
  .object({
    checkIn: z.coerce.date().refine((date) => date > new Date(), {
      message: 'Date must be in future',
    }),
    checkOut: z.coerce.date().refine((date) => date > new Date(), {
      message: 'Date must be in future',
    }),
    guestCount: z.coerce
      .number()
      .nonnegative({ message: 'Count must be positive' })
      .min(1, 'Set guest count to least of 1'),
    name: z.string().min(2, {
      message: 'Name should have at least of 2 characters',
    }),
    phone: z.coerce
      .number()
      .nonnegative({ message: 'Phone number must be positive' })
      .refine((num) => String(num).length === 10, {
        message: 'Phone number must have length 10 ',
      }),
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: 'Checkout date cannot be earlier than checkin date',
    path: ['checkOut'],
  })
  .refine((data) => data.checkIn < data.checkOut, {
    message: 'Checkin date cannot be later than checkout date',
    path: ['checkIn'],
  });
