import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// to extract user info of login & use it across our application (eg. display username in header)
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  // since we are setting context on login page only, which redirects to main page on success,
  // so our context is lost on other page if we reload, hence we need to keep track of login status using cookie
  useEffect(() => {
    if (!user) {
      axios.get('/user/profile').then(({ data }) => {
        setUser(data.user);
        setUserDataLoaded(true);
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, userDataLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
