import RatingAverage from '../common/RatingAverage';
import ReviewList from './ReviewList';

const Review = () => {
  return (
    <>
      <RatingAverage />
      <div className="w-full border border-b-gray-200 border-b-[0.5px] border-transparent" />
      <ReviewList />
    </>
  );
};

export default Review;
