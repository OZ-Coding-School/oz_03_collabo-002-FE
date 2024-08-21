import ReviewHeader from './ReviewHeader';
import ReviewItem from './ReviewItem';
import { useEffect, useState } from 'react';
import { Reviews } from '../../type/types';
import axios from '../../api/axios';

const Review = () => {
  const [reviews, setReviews] = useState<Reviews[]>([]);

  const fakeReviews = async () => {
    try {
      const response = await axios.get('/reviews');
      const data = response.data.reviews;
      setReviews(data);
      console.log(response);
      console.log(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fakeReviews();
  }, []);
  return (
    <div className="flex flex-col max-w-[475px] w-full min-h-screen h-full m-auto border-x border-gray-200 relative bg-gray-100">
      <ReviewHeader />
      {reviews.length > 0 ? (
        reviews.map((review) => <ReviewItem review={review} />)
      ) : (
        <p> No reviews available </p>
      )}
    </div>
  );
};

export default Review;
