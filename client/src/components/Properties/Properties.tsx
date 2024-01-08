import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { ImageCarouselSlider } from '../index';

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get('/')
      .then(({ data }) => {
        console.log('all properties: ', data);
        setProperties(data.accomodations);
      })
      .catch((err) => {
        alert(`Error in fetching results: ${err}`);
      });
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {properties.length > 0 &&
        properties.map((property: any) => (
          <div className="my-4 mx-8" key={property._id}>
            <ImageCarouselSlider images={property?.photos} />
            <Link to={`/accomodations/${property._id}`}>
              <div className="mt-4 flex flex-col">
                <h2 className="text-xl self-center font-semibold">
                  {truncateText(property.title, 10)}
                </h2>
                <p className="text-sm mt-2 self-start">
                  {truncateText(property.description, 100)}
                </p>
                <h3 className="font-semibold self-start mt-1 flex items-center gap-1">
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
                  {truncateText(property.address, 70)}
                </h3>
                <p className="text-sm self-start">
                  <span className="font-semibold">$ {property.price}</span> per
                  night
                </p>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Properties;
