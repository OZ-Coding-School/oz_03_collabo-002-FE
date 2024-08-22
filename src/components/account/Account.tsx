import { useLocation } from 'react-router-dom';
import MyInfo from './MyInfo';
import MyOrderList from './MyOrderList';
import MyQuestion from './MyQuestion';
import MyReview from './MyReview';
import AccountDashboard from './AccountDashboard';

const Account = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get('page'); // 'user', 'orders', 'questions', 'reviews', 'workshops'

  const renderPage = () => {
    switch (page) {
      case 'user':
        return <MyInfo />;
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


  return (
      <div>
        {renderPage()}
      </div>
  );
};

export default Account;
