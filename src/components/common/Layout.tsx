import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <div className="max-w-[475px] w-full h-full m-auto border border-gray-200">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
