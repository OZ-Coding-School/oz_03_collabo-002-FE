import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconPaginationRight } from '../../config/IconData';
import { IconUserAvatar } from '../../assets/icon';

const AccountDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguage = () => {}

  return (
    <div id="account-container" className="w-full h-full relative bg-white">
      {/* 전체 바디 영역 */}
      <div className="w-full">
        {/* 상단 유저 요약 정보 영역 */}
        <div
          className={`w-full h-[250px] flex ${isDarkMode ? 'bg-black' : 'bg-primary'}`}
        >
          <div className="m-auto flex flex-col items-center text-center">
            <IconUserAvatar />
            <div className="left-[24px] top-[85px]  text-center text-white text-lg font-extrabold">
              user name
            </div>
            <div className="left-0 top-[115px]  text-center text-white text-xs font-bold">
              user_mail@example.com
            </div>
          </div>
        </div>
        {/* 하단 컨텐츠 영역 */}
        <div className={` ${isDarkMode ? 'bg-black' : 'bg-primary'}`}>
          <div
            className={`w-full rounded-tr-3xl px-5 pt-10 ${isDarkMode ? 'bg-darkgray text-white' : 'bg-white'}`}
          >
            {/* 언어선택 */}
            <div className="w-full h-[60px] flex justify-between items-center">
              <h3>Language</h3>
              <select
                name="language"
                value={'none'}
                className={`text-sm bg-transparent ${isDarkMode ? 'text-white ' : 'text-black'}`}
                onChange={handleLanguage}
              >
                <option value="none" disabled>
                  choose Language{' '}
                </option>
                <option value="en">English</option>
                <option value="ch">Chinese</option>
                <option value="jp">Japanese</option>
              </select>
            </div>
            {/* 다크모드 */}
            <div className="w-full h-[60px] flex justify-between items-center">
              <h3>Dark Mode</h3>
              <button
                onClick={toggleDarkMode}
                className={`w-10 h-6 rounded-[25px] px-1 py-1 ${isDarkMode ? 'bg-white' : 'bg-[#d1d1d1]'}`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-4 bg-primary' : 'bg-white'}`}
                />
              </button>
            </div>
            {/* 계정 정보 상세 보기 */}
            <Link
              to={'/account?page=user'}
              className="w-full h-[60px] flex justify-between items-center"
            >
              <h3>My Profile</h3>
              <div className="w-6 h-6">
                <IconPaginationRight />
              </div>
            </Link>
            {/* 주문내역 보기 */}
            <Link
              to={'/account?page=orders'}
              className="w-full h-[60px] flex justify-between items-center"
            >
              <h3>My Orders</h3>
              <div className="w-6 h-6">
                <IconPaginationRight />
              </div>
            </Link>
            {/* 나의 리뷰 보기 */}
            <Link
              to={'/account?page=review'}
              className="w-full h-[60px] flex justify-between items-center"
            >
              <h3>My Review</h3>
              <div className="w-6 h-6">
                <IconPaginationRight />
              </div>
            </Link>
            {/* 나의 문의글 보기 */}
            <Link
              to={'/account?page=question'}
              className="w-full h-[60px] flex justify-between items-center"
            >
              <h3>My Question</h3>
              <div className="w-6 h-6">
                <IconPaginationRight />
              </div>
            </Link>
            {/* 회원 탈퇴 */}
            <Link
              to={''}
              className="w-full h-[60px] flex justify-between items-center"
            >
              <h3>Delete Account</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
