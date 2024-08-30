import { useEffect } from 'react';
import useReviewStore from '../../store/useReviewStore';
import ReviewItem from '../review/ReviewItem';

const Review = () => {
  const myReviews = useReviewStore((state) => state.myReviews);
  const getMyReviews = useReviewStore((state) => state.getMyReviews);

  useEffect(() => {
    getMyReviews();
  }, [getMyReviews]);

  if (!myReviews)
    return (
      <div className="inline-flex w-full aspect-square text-gray-500">
        <span className="m-auto font-extralight text-gray text-xl">
          No data
        </span>
      </div>
    );

  return (
    <div className="w-full px-6">
      {myReviews.length > 0 ? (
        myReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))
      ) : (
        <p> No reviews available </p>
      )}
    </div>
  );
};

export default Review;
