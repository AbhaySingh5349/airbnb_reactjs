import React, { useContext, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../../context/UserContext';
import { Accomodations, ProfileNavBar } from '../index';

const Profile = () => {
  const { user, setUser, userDataLoaded } = useContext(UserContext);
  let { subProfilePage } = useParams();
  if (subProfilePage === undefined) subProfilePage = 'profile';

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) navigate('/login');
  // }, [user, navigate, subProfilePage]);

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
      // navigate('/login');
    }
  };

  return (
    <div>
      <ProfileNavBar />

      {subProfilePage === 'profile' && (
        <div className="text-center mt-8 max-w-lg mx-auto">
          Logged in as {user.username} with email id {user.email}
          <button className="btn btn-primary max-w-sm mt-6" onClick={logOut}>
            LogOut
          </button>
        </div>
      )}
      {/* {subProfilePage === 'accomodations' && <div>{<Accomodations />}</div>} */}
    </div>
  );
};

export default Profile;
