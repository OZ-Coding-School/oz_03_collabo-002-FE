import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import ClassDetail from './pages/ClassDetail';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/classdetail" element={<ClassDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
