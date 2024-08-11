import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <div className="max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
