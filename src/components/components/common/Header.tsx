import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twJoin as tw } from 'tailwind-merge';
import { IconLogo } from '../../../config/IconData';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {location.pathname !== '/classdetail' ? (
        <>
          <header className="bg-white sticky top-0 left-0 z-30 border-y border-gray-200 flex px-5 py-4 overflow-hidden">
            <div className="flex items-center justify-between flex-grow bg-white">
              <div
                className="w-6 h-6 flex flex-col justify-around cursor-pointer"
                onClick={toggleNav}
              >
                <span className="block border-b border-b-1 border-black w-full"></span>
                <span className="block border-b border-b-1 border-black w-full"></span>
                <span className="block border-b border-b-1 border-black w-full"></span>
              </div>

              <h1>
                <IconLogo className="h-[24px]" />
              </h1>
              <ul className="flex items-center justify-center gap-2 text-sm">
                <li>
                  <Link to="">LOGIN</Link>
                </li>
                <li>
                  <Link to="">CART(0)</Link>
                </li>
              </ul>
            </div>
          </header>

          <div
            className={tw(
              'bg-white max-w-[474px] w-full fixed top-0 right-2/4 -mr-[237px] h-screen',
              'pt-[140px] px-6',
              isNavOpen ? 'z-50' : '-z-[1]',
            )}
          >
            <ul className="flex gap-6 pb-10">
              <li>
                <Link to="">LOGIN</Link>
              </li>
              <li>
                <Link to="">JOIN</Link>
              </li>
              <li>
                <Link to="">CART(0)</Link>
              </li>
            </ul>
            <ul className="flex flex-col text-[28px] leading-[80px]">
              <li className="hover:text-primary">
                <Link to="">Cooking</Link>
              </li>
              <li className="hover:text-primary">
                <Link to="">Art & Culture</Link>
              </li>
              <li className="hover:text-primary">
                <Link to="">Beauty & Fashion</Link>
              </li>
              <li className="hover:text-primary">
                <Link to="">DIY</Link>
              </li>
              <li className="hover:text-primary">
                <Link to="">Activities</Link>
              </li>
            </ul>
            <div
              className="w-6 h-6 flex flex-col justify-around cursor-pointer absolute left-[24px] top-[8px]"
              onClick={toggleNav}
            >
              <span className="block border-b border-b-1 border-black w-full rotate-45 mt-5 -ml-[2px]"></span>
              <span className="block border-b border-b-1 border-black w-full -rotate-45 -ml-[2.5px] -mt-[3px]"></span>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-16 bg-gray-100">
          <p>Class Detail Page</p>
        </div>
      )}
    </>
  );
};

export default Header;
