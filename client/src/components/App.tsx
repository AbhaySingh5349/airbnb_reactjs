import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import {
  Login,
  Register,
  Layout,
  Properties,
  Profile,
  Accomodations,
  AccomodationsForm,
} from './index';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true; // to save cookie in browser

function App() {
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
        </Route>
      </Routes>
    </main>
  );
}

export default App;
