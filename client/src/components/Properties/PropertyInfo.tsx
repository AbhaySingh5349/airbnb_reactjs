import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { ImageCarouselSlider, BookingForm, Image } from '../index';

interface PropertyProps {
  _id: string;
  title: string;
  address: string;
  description: string;
  photos: string[];
  amenities: {
    name: string;
    is_available: boolean;
  };
  extraInfo: string;
  checkIn: Date;
  checkOut: Date;
  maxGuests: number;
  price: number;
}

const PropertyInfo: React.FC = () => {
  const [property, setProperty] = useState<PropertyProps | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const { accomodationId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accomodationId) return;
    axios
      .get(`/accomodations/${accomodationId}`)
      .then(({ data }) => {
        console.log('property by id: ', data);
        setProperty(data.accomodation);
      })
      .catch((err) => {
        alert(`Error in fetching results, try login again: ${err}`);
        navigate('/login');
      });
  }, []);

  // if (!property) return <div>Loading Property Info...</div>;
  if (!property) return null;

  if (showAllPhotos) {
    return (
      // min-w-full min-h-screen
      <div className="flex flex-col justify-center items-center mt-8">
        <button
          onClick={() => {
            setShowAllPhotos(false);
          }}
        >
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
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
        <div className="bg-white w-1/2 h-20 mt-8">
          {property?.photos!?.length > 0 && (
            <ImageCarouselSlider images={property?.photos} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 px-8 py-4 rounded-md">
      <h1 className="text-2xl">{property?.title}</h1>
      <div className="mt-1 flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://maps.google.com/?q=${property?.address}`}
          className="block font-semibold underline"
        >
          {property?.address}
        </a>
      </div>
      <div className="relative">
        <div className="mt-4 grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            {property?.photos[0] && (
              <div>
                {/* <img
                  src={`http://localhost:8080/image-uploads/${property.photos[0]}`}
                  alt={property.photos[0]}
                  className="aspect-square object-cover max-h-96 rounded-md"
                /> */}
                <Image
                  src={property.photos[0]}
                  alt={property.photos[0]}
                  className="aspect-square object-cover max-h-96 rounded-md"
                />
              </div>
            )}
          </div>
          <div className="grid">
            {property?.photos[1] && (
              // <img
              //   src={`http://localhost:8080/image-uploads/${property.photos[1]}`}
              //   alt={property.photos[1]}
              //   className="aspect-square object-cover rounded-md"
              // />
              <Image
                src={property.photos[1]}
                alt={property.photos[1]}
                className="aspect-square object-cover rounded-md"
              />
            )}
            <div className="overflow-hidden">
              {property?.photos[2] && (
                // <img
                //   src={`http://localhost:8080/image-uploads/${property.photos[2]}`}
                //   alt={property.photos[2]}
                //   className="aspect-square object-cover relative top-2 rounded-md"
                // />
                <Image
                  src={property.photos[2]}
                  alt={property.photos[2]}
                  lassName="aspect-square object-cover relative top-2 rounded-md"
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-1 right-2 py-0.5 px-1 bg-white rounded-md text-sm shadow shadow-gray-500 flex gap-1 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Show All Photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-4 gap-4">
        <div>
          <div>
            <h2 className="font-bold">Description</h2>
            {property?.description}
          </div>

          <div className="mt-2 border-t py-2">
            <span className="font-semibold">Check-in: </span>1 p.m (noon) <br />
            <span className="font-semibold">Check-out: </span>11 a.m <br />
            <span className="font-semibold">Max guests: </span>
            {property?.maxGuests}
            <p className="border-t pt-2 mt-2">
              <span className="font-semibold">Additional Info:</span>{' '}
              <span className="text-gray-500">{property.extraInfo}</span>
            </p>
          </div>
        </div>
        <div className="bg-white shadow p-2 rounded-xl">
          <div className="text-center">
            Price: <span className="font-semibold">${property?.price}</span>
            /night per person
          </div>
          <BookingForm property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
