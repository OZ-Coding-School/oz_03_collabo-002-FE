import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './components/home/Home';
import ClassDetail from './pages/ClassDetail';
import { useEffect } from 'react';

function App() {
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
  }, [location.pathname]);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/classdetail" element={<ClassDetail rating={4.5} />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
