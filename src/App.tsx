import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import ClassDetail from './pages/ClassDetail';
import ChargePage from './pages/ChargePage';
import Admin from './components/admin/Admin';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Review from './components/review/Review';
import Account from './components/account/Account';
import { useEffect } from 'react';
import LikesPage from './pages/LikesPage';
import ClassDetailQnaAll from './components/classDetail/ClassDetailQnaAll';

function App() {
  const path = location.pathname;

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      if (location.pathname === '/classdetail') {
        footer.style.paddingBottom = '220px';
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
            <Route path="/classdetail" element={<ClassDetail rating={4.5} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/charge" element={<ChargePage />} />
            <Route path="admin" element={<Admin />} />
            <Route path="/likes" element={<LikesPage />} />
            <Route path="/question/:id" element={<ClassDetailQnaAll />} />
            <Route path="/review" element={<Review />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
