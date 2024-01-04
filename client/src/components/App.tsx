import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { Login, Register, Layout, Properties, Profile } from './index';

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
          <Route path="/profile/:subProfilePage?" element={<Profile />} />
          {/* <Route path="/profile/bookings" element={<Profile />} />
          <Route path="/profile/accomodations" element={<Profile />} /> */}
        </Route>
      </Routes>
    </main>
  );
}

export default App;
