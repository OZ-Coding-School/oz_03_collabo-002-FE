import { useEffect } from 'react';
import useReviewStore from '../../store/useReviewStore';
import ReviewItem from '../review/ReviewItem';

const Review = () => {
  const myReviews = useReviewStore((state) => state.myReviews);
  const getMyReviews = useReviewStore((state) => state.getMyReviews);

  useEffect(() => {
    getMyReviews();
  }, [getMyReviews]);

  if (!myReviews) {
    return (
      <div className="inline-flex w-full aspect-square text-gray-500">
        <span className="m-auto w-5/6 text-gray text-xl text-center">
          {`Please share your cherished moments while experiencing the class!`}
        </span>
      </div>
    );
  }

  console.log(myReviews)

  return (
    <div className="w-full px-6">
      {myReviews.length > 0 ? (
        myReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))
      ) : (
        <div className="inline-flex w-full aspect-square text-gray-500">
          <span className="m-auto w-3/4 text-gray text-xl text-center">
            {`Please share your cherished moments while experiencing the class!`}
          </span>
        </div>
      )}
    </div>
  );
};

export default Review;
