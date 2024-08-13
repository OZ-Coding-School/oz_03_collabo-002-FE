import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <div className="max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
