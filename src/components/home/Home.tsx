import { useEffect } from 'react';
import useClassStore from '../../store/useClassStore';
import Banner from '../common/Banner';
import Pagination from '../common/Pagination';

const Home = () => {
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  return (
    <div>
      <Pagination />
      <Banner />
    </div>
  );
};

export default Home;
