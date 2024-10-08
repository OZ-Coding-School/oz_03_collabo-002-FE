import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyOrderList from './MyOrderList';
import MyQuestion from './MyQuestion';
import MyReview from './MyReview';
import AccountDashboard from './AccountDashboard';
import AccountEditProfile from './AccountEditProfile';
import AccountUserInfo from './AccountUserInfo';
import AccountHeader from './AccountHeader';
import {useUserStore} from '../../store/useUser';
import MyLike from './MyLike';

const Account = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page'); 
  const [headerTitle, setHeaderTitle] = useState('Account');
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const isLogin = !!user;

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
      case 'like':
        setHeaderTitle('My Likes');
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
      case 'like':
        return <MyLike />;
      default:
        return <AccountDashboard />;
    }
  };

  if (!isLogin) {
    navigate('/login/');
  }

  return (
    <>
      <AccountHeader headerText={headerTitle} />
      <AccountUserInfo />
      <div className="w-full py-[15px]">{renderPage()}</div>
    </>
  );
};

export default Account;
