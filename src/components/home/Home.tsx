import { useEffect } from 'react'; // 최상위 레벨에서 import
import useClassStore from '../../store/useClassStore';
import Pagination from '../common/Pagination';
import Banner from '../common/Banner';

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
