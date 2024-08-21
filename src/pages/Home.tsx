import HomeSlideBanner from '../components/home/HomeSlideBanner';
import HomeCategoryList from '../components/home/HomeCategoryList';
import PopularClasses from '../components/home/PopularClasses';

const Home = () => {
  return (
    <div>
      <HomeSlideBanner />
      <HomeCategoryList />
      <PopularClasses />
    </div>
  );
};

export default Home;
