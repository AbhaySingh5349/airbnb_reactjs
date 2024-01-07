import { Outlet } from 'react-router-dom';

import { Header } from './index';

const Layout = () => {
  return (
    <div className="px-8 py-4 flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
