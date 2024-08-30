import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyOrderList from './MyOrderList';
import MyQuestion from '../question/MyQuestion';
import MyReview from './MyReview';
import AccountDashboard from './AccountDashboard';
import AccountEditProfile from './AccountEditProfile';
import AccountUserInfo from './AccountUserInfo';
import AccountHeader from './AccountHeader';
import useAccountStore from '../../store/useAccountStore';
import { useUserStore } from '../../store/useUser';
import useLikeStore from '../../store/useLikeStore';
import MyLike from './MyLike';

const Account = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page'); // 'user', 'orders', 'questions', 'reviews', 'workshops'
  const [headerTitle, setHeaderTitle] = useState('Account');
  const user = useUserStore((state) => state.user);
  const fetchUser = useAccountStore((state) => state.fetchUser);
  const likedClasses = useLikeStore((state) => state.likedClasses);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // const isLogin = !!localStorage.getItem("access");
  const isLogin = !!user;

  if (!user) navigate('/login');

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
    navigate('/login');
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
