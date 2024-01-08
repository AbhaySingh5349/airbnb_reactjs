import React, { useState, useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import { BookingSchema } from '../../types/validations';
import { BookingData } from '../../types';

interface Props {
  property: {
    _id: string;
    price: number;
  };
}

const BookingForm = ({ property }: Props) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof BookingSchema>>({
    mode: 'onChange',
    resolver: zodResolver(BookingSchema),
  });

  const formSubmitHandler: SubmitHandler<
    z.infer<typeof BookingSchema>
  > = async (data: BookingData) => {
    console.log('booking data: ', data);

    const numberOfNights = differenceInCalendarDays(
      new Date(data.checkOut),
      new Date(data.checkIn)
    );

    const bookingPrice = property.price * numberOfNights * data.guestCount;
    setTotalPrice(bookingPrice);

    const bookingData = {
      accomodationId: property._id,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guestCount: data.guestCount,
      name: data.name,
      phone: data.phone,
      price: totalPrice,
    };

    try {
      await axios.post('/bookings', bookingData);
      alert('form submitted');
      reset();
      navigate('/profile/bookings');
    } catch (err) {
      alert(`It looks you are logged-out, please login again: ${err}`);
      navigate('/login');
    }
  };

  const numberOfNights = differenceInCalendarDays(
    new Date(watch('checkOut')),
    new Date(watch('checkIn'))
  );
  const guestCount = watch('guestCount');

  useEffect(() => {
    const bookingPrice = property.price * numberOfNights * guestCount;
    if (isNaN(bookingPrice) || bookingPrice <= 0) {
      setTotalPrice(0);
    } else {
      setTotalPrice(bookingPrice);
    }
  }, [property.price, numberOfNights, guestCount]);

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <div className="border rounded-md mt-2 flex">
        <div className="p-2 grow">
          <label>Check-in:</label>
          <input type="date" className="form-input" {...register('checkIn')} />
          {errors.checkIn && (
            <span className="text-primary-500 text-sm">
              {errors.checkIn.message}
            </span>
          )}
        </div>
        <div className="p-2 border-l grow">
          <label>Check-out:</label>
          <input type="date" className="form-input" {...register('checkOut')} />
          {errors.checkOut && (
            <span className="text-primary-500 text-sm">
              {errors.checkOut.message}
            </span>
          )}
        </div>
      </div>
      <div className="mt-2 px-3">
        <label>Number of Guests:</label>
        <input
          type="number"
          className="form-input max-w-24 ml-2"
          {...register('guestCount')}
        />
        {errors.guestCount && (
          <span className="text-primary-500 text-sm ml-1">
            {errors.guestCount.message}
          </span>
        )}
      </div>
      {numberOfNights > 0 && guestCount > 0 && (
        <div className="mt-2 px-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-input max-w-80 ml-4"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-primary-500 text-sm">
              {errors.name.message}
            </span>
          )}
        </div>
      )}
      {numberOfNights > 0 && guestCount > 0 && (
        <div className="mt-2 px-3">
          <label>Phone:</label>
          <input
            type="number"
            className="form-input max-w-48 ml-4"
            {...register('phone')}
          />
          {errors.phone && (
            <span className="text-primary-500 text-sm">
              {errors.phone.message}
            </span>
          )}
        </div>
      )}
      <button
        className="btn btn-primary mt-2"
        disabled={isSubmitting || totalPrice <= 0}
        type="submit"
      >
        {' '}
        {isSubmitting
          ? 'Booking Place...'
          : `Book Place${totalPrice > 0 ? ` for $${totalPrice}` : ''}`}
      </button>
    </form>
  );
};

export default BookingForm;
