import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MyOrderList from './MyOrderList';
import MyQuestion from './MyQuestion';
import MyReview from './MyReview';
import AccountDashboard from './AccountDashboard';
import AccountEditProfile from './AccountEditProfile';
import AccountUserInfo from './AccountUserInfo';
import AccountHeader from './AccountHeader';
import useAccountStore from '../../store/useAccountStore';

const Account = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page'); // 'user', 'orders', 'questions', 'reviews', 'workshops'
  const [headerTitle, setHeaderTitle] = useState('Account');
  const fetchUser = useAccountStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // const isLogin = !!localStorage.getItem("access");

  useEffect(() => {
    switch (page) {
      case 'edit':
        setHeaderTitle('Edit Profile');
        break;
      case 'orders':
        setHeaderTitle('My Orders');
        break;
      case 'question':
        setHeaderTitle('My Questions');
        break;
      case 'review':
        setHeaderTitle('My Reviews');
        break;
      default:
        setHeaderTitle('Account Dashboard');
        break;
    }
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'edit':
        return <AccountEditProfile />;
      case 'orders':
        return <MyOrderList />;
      case 'question':
        return <MyQuestion />;
      case 'review':
        return <MyReview />;
      default:
        return <AccountDashboard />;
    }
  };

  // if(!isLogin) {
  //   <Navigate to="/login" />
  // }

  return (
    <>
      <AccountHeader headerText={headerTitle} />
      <AccountUserInfo />
      <div className="w-full py-[15px]">{renderPage()}</div>
    </>
  );
};

export default Account;
