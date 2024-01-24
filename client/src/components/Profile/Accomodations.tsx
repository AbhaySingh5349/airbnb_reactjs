import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ProfileNavBar, Image } from '../index';

const Accomodations = () => {
  const [accomodations, setAccomodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/accomodations')
      .then(({ data }) => {
        console.log('all accomodations: ', data);
        setAccomodations(data.accomodations);
      })
      .catch((err) => {
        alert(`Error in fetching results: ${err}`);
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div>
      <ProfileNavBar />

      <div className="text-center">
        <Link
          to="/profile/accomodations/new"
          className="inline-flex gap-1 px-6 py-2 mt-4 rounded-full bg-primary-100 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add New Place
        </Link>

        {accomodations.length > 0 && (
          <div className="mt-8">
            {accomodations.map((place: any) => (
              <Link
                to={`/profile/accomodations/${place._id}`}
                key={place._id}
                className="flex gap-4 bg-gray-100 p-4 rounded-lg mt-2"
              >
                <div className="flex w-32 h-32 bg-gray-300 rounded-md">
                  {place.photos.length && (
                    // <img
                    //   src={`http://localhost:8080/image-uploads/${place.photos[0]}`}
                    //   alt={place.photos[0]}
                    //   className="object-cover"
                    // />
                    <Image
                      src={place.photos[0]}
                      alt={place.photos[0]}
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h2 className="text-xl text-left">{place.title}</h2>
                  <p className="text-sm mt-2 text-left">{place.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accomodations;
