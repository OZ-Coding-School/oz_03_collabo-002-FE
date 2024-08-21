import { useLocation } from 'react-router-dom';
import AccountOrderList from './MyOrderList';
import AccountMyQuestions from './MyQuestions';
import MyReviews from './MyReviews';
import AccountDashboard from './AccountDashboard';
import MyTodayWorkshops from './MyTodayWorkshops';
import AccountEditProfile from './AccountEditProfile';

const Account = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page'); // 'user', 'orders', 'questions', 'reviews', 'workshops'

  const renderPage = () => {
    switch (page) {
      case 'edit':
        return <AccountEditProfile />;
      case 'orders':
        return <AccountOrderList />;
      case 'questions':
        return <AccountMyQuestions />;
      case 'reviews':
        return <MyReviews />;
      case 'workshops':
        return <MyTodayWorkshops />;
      default:
        return <AccountDashboard />; 
    }
  };


  return (
      <div>
        {renderPage()}
      </div>
  );
};

export default Account;
