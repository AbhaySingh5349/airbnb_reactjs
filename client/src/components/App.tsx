import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import {
  Login,
  Register,
  Layout,
  Properties,
  PropertyInfo,
  Profile,
  Accomodations,
  AccomodationsForm,
  Bookings,
} from './index';

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;
axios.defaults.withCredentials = true; // to save cookie in browser

function App() {
  console.log(
    'process.env.REACT_APP_AXIOS_BASE_URL: ',
    process.env.REACT_APP_AXIOS_BASE_URL
  );
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/accomodations" element={<Accomodations />} />
          <Route
            path="/profile/accomodations/new"
            element={<AccomodationsForm />}
          />
          <Route
            path="/profile/accomodations/:accomodationId"
            element={<AccomodationsForm />}
          />
          <Route
            path="/accomodations/:accomodationId"
            element={<PropertyInfo />}
          />
          <Route path="/profile/bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
