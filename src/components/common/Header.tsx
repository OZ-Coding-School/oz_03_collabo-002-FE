import { Link, useLocation } from 'react-router-dom';
import { twJoin as tw } from 'tailwind-merge';
import {
  IconHdBack,
  IconHdHeart,
  IconHdUser,
  IconLogin,
  IconLogo,
} from '../../config/IconData';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/useUser';

const Header = () => {
  const user = useUserStore((state) => state.user);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    if (!user) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [user]);

  return (
    <>
      <>
        <header className="bg-white sticky top-0 left-0 z-30 border-y border-gray-200 flex px-6 py-4 overflow-hidden">
          <div className="flex items-center justify-items-start flex-grow bg-white">
            {!location.pathname.startsWith('/class/') ? (
              <>
                <div
                  className="w-6 h-6 flex flex-col justify-around cursor-pointe mr-2"
                  onClick={toggleNav}
                >
                  <span className="block border-b border-b-1 border-black w-full"></span>
                  <span className="block border-b border-b-1 border-black w-full"></span>
                  <span className="block border-b border-b-1 border-black w-full"></span>
                </div>

                <h1>
                  <Link to="/">
                    <IconLogo className="h-[24px]" />
                  </Link>
                </h1>
              </>
            ) : (
              <Link to="">
                <IconHdBack />
              </Link>
            )}
            <ul className="flex items-center justify-center gap-2 text-sm absolute right-6">
              {isLogin ? (
                <>
                  <li>
                    <Link to="/account">
                      <IconHdUser />
                      <span className="sr-only">LOGIN</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="">
                      <IconHdHeart />
                      <span className="sr-only">HEART</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login">
                    <IconLogin />
                    <span className="sr-only">Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </header>

        <div
          className={tw(
            'bg-white max-w-[400px] w-full fixed top-0 right-2/4 -mr-[163px] h-screen',
            'pt-[100px] px-6',
            isNavOpen ? 'z-50' : '-z-[1]',
          )}
        >
          <ul className="flex gap-6 pb-10">
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
            <li>
              <Link to="/signup">JOIN</Link>
            </li>
            <li>
              <Link to="/likes">HEART</Link>
            </li>
          </ul>
          <ul className="flex flex-col text-[28px] leading-[80px]">
            <li className="hover:text-primary">
              <Link to="/category/cooking" onClick={toggleNav}>
                Cooking
              </Link>
            </li>
            <li className="hover:text-primary">
              <Link to="/category/art-culture" onClick={toggleNav}>
                Art & Culture
              </Link>
            </li>
            <li className="hover:text-primary">
              <Link to="/category/beauty-fashion" onClick={toggleNav}>
                Beauty & Fashion
              </Link>
            </li>
            <li className="hover:text-primary">
              <Link to="/category/diy" onClick={toggleNav}>
                DIY
              </Link>
            </li>
            <li className="hover:text-primary">
              <Link to="/category/activities" onClick={toggleNav}>
                Activities
              </Link>
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

        <div
          className={tw(
            'bg-black opacity-90 max-w-[473px] w-full fixed top-0 right-2/4 -mr-[236px] h-screen',
            'pt-[100px] px-6',
            isNavOpen ? 'z-30' : '-z-[2]',
          )}
        ></div>
      </>
    </>
  );
};

export default Header;
