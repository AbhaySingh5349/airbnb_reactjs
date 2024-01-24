import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';

import { AccomodationSchema } from '../../types/validations';
import { AccomodationData } from '../../types';
import { ProfileNavBar, PhotosUploader } from '../index';

interface AmenitiesObject {
  [key: string]: boolean;
}

const AccomodationsForm = () => {
  const [addedPhotos, setAddedPhotos] = useState<Array<string>>([]);

  const navigate = useNavigate();

  const { accomodationId } = useParams();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof AccomodationSchema>>({
    mode: 'onChange',
    resolver: zodResolver(AccomodationSchema),
  });

  useEffect(() => {
    if (!accomodationId) return;
    axios
      .get(`/accomodations/${accomodationId}`)
      .then(({ data }) => {
        const amenitiesObject: AmenitiesObject =
          data.accomodation.amenities.reduce((acc: any, item: any) => {
            acc[item.name] = item.is_available;
            return acc;
          }, {});

        reset({
          title: data.accomodation.title || '',
          address: data.accomodation.address || '',
          description: data.accomodation.description || '',
          has_wifi: amenitiesObject['has_wifi'] || false,
          has_tv: amenitiesObject['has_tv'] || false,
          has_breakfast_included:
            amenitiesObject['has_breakfast_included'] || false,
          has_terrace_club: amenitiesObject['has_terrace_club'] || false,
          has_pets_allowed: amenitiesObject['has_pets_allowed'] || false,
          has_free_parking: amenitiesObject['has_free_parking'] || false,
          extraInfo: data.accomodation.extraInfo || '',
          checkIn: data.accomodation.checkIn.replace('T00:00:00.000Z', ''),
          checkOut: data.accomodation.checkOut.replace('T00:00:00.000Z', ''),
          maxGuests: data.accomodation.maxGuests || 0,
          price: data.accomodation.price || 1,
        });
        setAddedPhotos(data.accomodation.photos);
      })
      .catch((err) => {
        alert('Login again');
        navigate('/login');
      });
  }, [accomodationId, navigate, reset]);

  const formSubmitHandler: SubmitHandler<
    z.infer<typeof AccomodationSchema>
  > = async (data: AccomodationData) => {
    console.log('input place data: ', data);
    console.log('photos data: ', addedPhotos);
    const placeData = {
      title: data.title,
      address: data.address,
      photos: addedPhotos,
      description: data.description,
      has_wifi: data.has_wifi,
      has_tv: data.has_tv,
      has_breakfast_included: data.has_breakfast_included,
      has_terrace_club: data.has_terrace_club,
      has_pets_allowed: data.has_pets_allowed,
      has_free_parking: data.has_free_parking,
      extraInfo: data.extraInfo || '',
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      maxGuests: data.maxGuests,
      price: data.price,
    };

    if (accomodationId) {
      // Update existing Place
      console.log('UPDATE EXISTING PLACE');
      try {
        await axios.put('/accomodations', {
          accomodationId,
          ...placeData,
        });
        alert('form submitted with updates');
        reset();
        navigate('/profile/accomodations');
      } catch (err) {
        alert(`Failed to login: ${err}`);
        navigate('/login');
      }
    } else {
      // New Place
      console.log('ADD NEW PLACE');
      try {
        await axios.post('/accomodations', placeData);
        alert('form submitted');
        reset();
        navigate('/profile/accomodations');
      } catch (err) {
        alert(`Failed to upload, please check if you are logged-in: ${err}`);
        // navigate('/login');
      }
    }
  };

  function inputHeader(text: string) {
    return <h2 className="text-xl mt-4">{text}</h2>;
  }

  return (
    <div>
      <ProfileNavBar />
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="mx-auto max-w-3xl"
      >
        {inputHeader('Title')}
        <input
          type="text"
          placeholder="title eg. my lovely appartment"
          {...register('title')}
          className="form-input"
        />
        {errors.title && (
          <span className="text-primary-500">{errors.title.message}</span>
        )}
        {inputHeader('Address')}
        <input
          type="text"
          placeholder="address"
          {...register('address')}
          className="form-input"
        />
        {errors.address && (
          <span className="text-primary-500">{errors.address.message}</span>
        )}
        {inputHeader('Photos')}
        <span className="text-gray-500 text-sm">(upto 5)</span>
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
        {addedPhotos.length === 0 && (
          <span className="text-primary-500">Add at least 1 photo</span>
        )}
        {inputHeader('Description')}
        <span className="text-gray-500 text-sm">(upto 200 characters)</span>
        <textarea
          placeholder="description of place"
          {...register('description')}
          className="form-input h-32"
        />
        {errors.description && (
          <span className="text-primary-500">{errors.description.message}</span>
        )}
        {inputHeader('Amenities')}
        <div className="grid gap-1 grid-cols-2 md:grid-cols-3 mt-2">
          <label className="flex gap-1 items-center border p-4 cursor-pointer">
            <input type="checkbox" {...register('has_wifi')} />
            <span>Wifi</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
              />
            </svg>
          </label>
          <label className="flex gap-1 items-center border p-4 cursor-pointer">
            <input type="checkbox" {...register('has_tv')} />
            <span>LCD</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </label>
          <label className="flex gap-1 items-center border p-4 cursor-pointer">
            <input type="checkbox" {...register('has_breakfast_included')} />
            <span>Breakfast Included</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
              />
            </svg>
          </label>
          <label className="flex gap-1 items-center border p-4 cursor-pointer">
            <input type="checkbox" {...register('has_terrace_club')} />
            <span>Terrace Ckub</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
          </label>
          <label className="flex gap-1 items-center border p-4 cursor-pointer">
            <input type="checkbox" {...register('has_pets_allowed')} />
            <span>Pets Allowed</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </label>
          <label className="flex gap-1 items-center border p-4 cursor-pointer">
            <input type="checkbox" {...register('has_free_parking')} />
            <span>Free Parking</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </label>
        </div>
        {inputHeader('Extra Info')}
        <textarea
          placeholder="house rules, etc..."
          {...register('extraInfo')}
          className="form-input"
        />
        {errors.extraInfo && (
          <span className="text-primary-500">{errors.extraInfo.message}</span>
        )}
        <div className="grid gap-1 grid-cols-1 md:grid-cols-3">
          <div>
            {inputHeader('Check-In Date')}
            <input
              type="date"
              placeholder="check-in date"
              {...register('checkIn')}
              className="form-input"
            />
            {errors.checkIn && (
              <span className="text-primary-500">{errors.checkIn.message}</span>
            )}
          </div>

          <div>
            {inputHeader('Check-Out Date')}
            <input
              type="date"
              placeholder="check-out date"
              {...register('checkOut')}
              className="form-input"
            />
            {errors.checkOut && (
              <span className="text-primary-500">
                {errors.checkOut.message}
              </span>
            )}
          </div>

          <div>
            {inputHeader('Max. Guest Count')}
            <input
              type="number"
              placeholder="max number of guests"
              {...register('maxGuests')}
              className="form-input"
            />
            {errors.maxGuests && (
              <span className="text-primary-500">
                {errors.maxGuests.message}
              </span>
            )}
          </div>
        </div>
        {inputHeader('Price')}
        <input
          type="number"
          placeholder="price/night for 1 person"
          {...register('price')}
          className="form-input"
        />
        {errors.price && (
          <span className="text-primary-500">{errors.price.message}</span>
        )}
        <button
          className="btn btn-primary mt-8 max-w-3xl mx-auto self-center"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting
            ? accomodationId
              ? 'Updating Place...'
              : 'Adding Place...'
            : accomodationId
            ? 'Update Place'
            : 'Add Place'}
        </button>
      </form>
    </div>
  );
};

export default AccomodationsForm;
