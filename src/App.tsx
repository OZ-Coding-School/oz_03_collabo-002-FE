import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import MyPage from './pages/MyPage';
import ClassDetail from './components/classDetail/ClassDetail';
import ChargePage from './pages/ChargePage';
import Admin from './components/admin/Admin';
import SignUp from './pages/SignUp';
import Login from './pages/Login';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/category/:classDetail_id" element={<ClassDetail />} />
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
