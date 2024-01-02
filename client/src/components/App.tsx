import { Login, Register, Layout, Properties } from './index';

import { Routes, Route } from 'react-router-dom';

import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Properties />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
