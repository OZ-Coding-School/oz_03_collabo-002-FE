import HomeCategoryList from './HomeCategoryList';
import HomeInstaStory from './HomeInstaStory';
import HomeSlideBanner from './HomeSlideBanner';
import HomeWideBnr from './HomeWideBnr';
import PopularClasses from './PopularClasses';
import NewClasses from './NewClasses';
import KpickClasses from './KpickClasses';

const Home = () => {
  return (
    <div>
      <HomeSlideBanner />
      <HomeCategoryList />
      <PopularClasses />
      <HomeWideBnr />
      <HomeInstaStory />
      <KpickClasses />
      <NewClasses />
    </div>
  );
};

export default Home;
