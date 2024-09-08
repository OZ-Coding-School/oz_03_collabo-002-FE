import { useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';
import useReviewStore from '../../store/useReviewStore';
import { useEffect } from 'react';

const ReviewsList = () => {
  const { id } = useParams();
  const reviews = useReviewStore((state) => state.reviews);
  const getReviews = useReviewStore((state) => state.getReviews);
  const isUpdate = useReviewStore((state) => state.setIsUpdate);
  const isDelete = useReviewStore((state) => state.setIsDelete);
  // const [isUpdate, setIsUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getReviews(Number(id));
      console.log('id: ', id);
      console.log('reviews: ', reviews);
    }
  }, [getReviews, isUpdate, id, isDelete]);

  if (!reviews) return <h1>Loading..</h1>;

  return (
    <div className=" divide-y-[0.5px] flex flex-col w-full h-full">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            classId={id}
            // setIsUpdate={setIsUpdate}
            // isUpdate={isUpdate}
          />
        ))
      ) : (
        <p> No reviews available </p>
      )}
    </div>
  );
};

export default ReviewsList;
