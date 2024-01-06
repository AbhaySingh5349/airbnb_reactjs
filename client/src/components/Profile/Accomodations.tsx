import { Link } from 'react-router-dom';
import { ProfileNavBar } from '../index';

const Accomodations = () => {
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
      </div>
    </div>
  );
};

export default Accomodations;
