import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import RatingAverage from '../common/RatingAverage';
import { useEffect } from 'react';

const Review = () => {
  const { id } = useParams();
  // console.log('id:', id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <RatingAverage id={id} />
      <div className="w-full border border-b-gray-200 border-b-[0.5px] border-transparent" />
      <ReviewList />
    </>
  );
};

export default Review;
