import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import ClassDetail from './components/classDetail/ClassDetail';
import ChargePage from './pages/ChargePage';
import Admin from './components/admin/Admin';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Account from './components/account/Account';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="/category/:classDetail_id" element={<ClassDetail />} />
            <Route path="/category/1" element={<ClassDetail />} />
            <Route path="/charge" element={<ChargePage />} />
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
