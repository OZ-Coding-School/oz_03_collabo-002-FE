import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import ClassDetail from './pages/ClassDetail';
import { useEffect } from 'react';
import ChargePage from './pages/ChargePage';
import Admin from './components/admin/Admin';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Review from './components/review/Review';
import Account from './components/account/Account';
import LikesPage from './pages/LikesPage';
import ClassDetailQnaAll from './components/classDetail/ClassDetailQnaAll';
import Redirection from './pages/Redirection';
import Category from './components/classByCategory/Category';
import ModalReviewWrite from './components/common/ModalReviewWrite';
import LineEmail from './components/Login/LineEmail';

function App() {
  const path = location.pathname;

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      if (location.pathname.includes('/class/')) {
        footer.style.paddingBottom = '350px';
      } else {
        footer.style.paddingBottom = '';
      }
    }

    return () => {
      if (footer) {
        footer.style.paddingBottom = '';
      }
    };
  }, [path]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/category/:keyword" element={<Category />} />
            <Route path="/class/:id" element={<ClassDetail rating={4.5} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/charge" element={<ChargePage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="/likes" element={<LikesPage />} />
            <Route path="/question/:id" element={<ClassDetailQnaAll />} />
            <Route path="/review" element={<Review />} />
            {/* <Route path="/review/:id" element={<Review />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Redirection />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reviewModal" element={<ModalReviewWrite />} />
          <Route path="/auth/lineEmail" element={<LineEmail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
