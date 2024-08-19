import { useLocation } from 'react-router-dom';
import MyInfo from './MyInfo';
import AccountOrderList from './MyOrderList';
import AccountMyQuestions from './MyQuestions';
import MyReviews from './MyReviews';
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
        return <AccountOrderList />;
      case 'questions':
        return <AccountMyQuestions />;
      case 'reviews':
        return <MyReviews />;
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
