import HomeSlideBanner from '../components/home/HomeSlideBanner';
import HomeCategoryList from '../components/home/HomeCategoryList';
import PopularClasses from '../components/home/PopularClasses';
import KpickClasses from '../components/home/KpickClasses';
import HomeWideBnr from '../components/home/HomeWideBnr';
import HomeInstaStory from '../components/home/HomeInstaStory';
import NewClasses from '../components/home/NewClasses';

const Home = () => {
  return (
    <div>
      <HomeSlideBanner />
      <HomeCategoryList />
      <PopularClasses />
      <HomeWideBnr />
      <KpickClasses />
      <HomeInstaStory />
      <NewClasses />
    </div>
  );
};

export default Home;
