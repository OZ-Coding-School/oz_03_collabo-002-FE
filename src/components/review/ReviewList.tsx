import { useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import useReviewStore from '../../store/useReviewStore';
import { useEffect, useState } from 'react';
import Button from '../common/Button';

const ReviewsList = () => {
  const { id } = useParams();
  const reviews = useReviewStore((state) => state.reviews);
  const getReviews = useReviewStore((state) => state.getReviews);
  const setIsUpdate = useReviewStore((state) => state.setIsUpdate);
  const setIsDelete = useReviewStore((state) => state.setIsDelete);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadInitialReviews();
    }
  }, [id, setIsUpdate, setIsDelete]);

  const loadInitialReviews = async () => {
    if (!id) return;
    setIsLoading(true);
    const initialReviews = await getReviews(Number(id), 1, 15);
    setHasMore(initialReviews.length === 15);
    setIsLoading(false);
  };

  const handleMore = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id || isLoading) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const newReviews = await getReviews(Number(id), nextPage, 15);
    if (newReviews.length > 0) {
      setPage(nextPage);
      setHasMore(newReviews.length === 15);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  if (!reviews) return <h1>Loading..</h1>;

  return (
    <div className="flex flex-col w-full">
      <div className="divide-y-[0.5px] flex flex-col w-full">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} classId={id} />
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
      {hasMore && (
        <Button
          type="button"
          size="sm"
          value={isLoading ? 'Loading...' : 'More Reviews'}
          onClick={handleMore}
          className={`mt-4 mx-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      )}
    </div>
  );
};

export default ReviewsList;
