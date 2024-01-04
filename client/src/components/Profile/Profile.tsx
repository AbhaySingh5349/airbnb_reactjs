import React, { useContext } from 'react';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../../context/UserContext';

const Profile = () => {
  const { user, setUser, userDataLoaded } = useContext(UserContext);
  let { subProfilePage } = useParams();
  if (subProfilePage === undefined) subProfilePage = 'profile';

  const navigate = useNavigate();

  if (!userDataLoaded)
    return (
      <h1 className="text-primary-300 text-center mt-4">
        Loading User Profile...
      </h1>
    );

  if (userDataLoaded && !user) return <Navigate to="/login" />;

  const logOut = async () => {
    try {
      const { data } = await axios.post('/auth/logout');
      alert(data.msg);
      setUser(null);
      navigate('/');
    } catch (err) {
      alert(`Failed to logout: ${err}`);
    }
  };

  function linkClasses(type = 'profile') {
    let classes = 'px-6 py-2';

    if (type === subProfilePage) {
      classes += ' rounded-full bg-primary-100';
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center gap-4 mt-8">
        <Link to="/profile" className={linkClasses('profile')}>
          My Profile
        </Link>
        <Link to="/profile/bookings" className={linkClasses('bookings')}>
          My Bookings
        </Link>
        <Link
          to="/profile/accomodations"
          className={linkClasses('accomodations')}
        >
          My Accomodations
        </Link>
      </nav>
      {subProfilePage === 'profile' && (
        <div className="text-center mt-8 max-w-lg mx-auto">
          Logged in as {user.username} with email id {user.email}
          <button className="btn btn-primary max-w-sm mt-6" onClick={logOut}>
            LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
