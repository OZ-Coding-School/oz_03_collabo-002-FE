import useClassStore from '../../store/useClassStore';
import { useEffect } from 'react';

const Home = () => {
  const fetchClasses = useClassStore((state) => state.fetchClasses);
  useEffect(() => {
    fetchClasses();
  }, []);

  return <div className="p-5">커스텀 K 입니다</div>;
};

export default Home;
