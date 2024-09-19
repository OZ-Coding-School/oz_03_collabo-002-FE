import { useNavigate } from 'react-router-dom';
import {
  IconAllArw,
  IconReviewHeart,
  IconReviewStar,
} from '../../config/IconData';
import { Review } from '../../type/review.type';
import Button from '../common/Button';

type ClassDetailReviewProps = {
  reviews: Review[] | null;
  id: string;
};
const ClassDetailReview = ({ reviews, id }: ClassDetailReviewProps) => {
  const navigate = useNavigate();

  const handleAllReview = () => {
    navigate(`/review/${id}`);
  };

  // 리뷰 등록 모달 구현 로직
  const handleAddReview = () => {
    navigate(`/reviewModal/${id}`);
  };

  return (
    <div className="mt-10 px-6">
      <h3 className="text-[20px] font-semibold flex justify-between">
        Reviews
        <button
          onClick={handleAllReview}
          className="text-[14px] font-normal flex items-center"
        >
          view all
          <IconAllArw className="ml-1" />
        </button>
      </h3>
      <div className="mt-4 px-6">
        {reviews
          ?.map((review) => (
            <div className="relative" key={review.id}>
              <div className="flex">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  {}
                  <img
                    src={
                      review.user.profile_image_url || '/images/user-empty.png'
                    }
                    alt="sample img"
                  ></img>
                </div>
                <div className="text-[14px] ml-4">
                  <strong className="font-semibold">{review.user.name}</strong>
                  <p className="flex items-center">
                    <IconReviewStar className="mr-1" />
                    {review.rating}
                  </p>
                </div>
              </div>
              <p className="text-[14px] mt-4 overflow-hidden">
                {review.review}
              </p>
              <span className="absolute right-0 top-0 p-2 border border-gray-300 rounded-lg flex items-center">
                <IconReviewHeart className="mr-1 fill-none stroke-current hover:stroke-none hover:fill-primary" />
                {review.likes_count}
              </span>
            </div>
          ))
          .slice(0, 1)}
      </div>
      <div className="px-6 my-[30px]">
        <Button
          type="button"
          size="full"
          value="add your Review"
          onClick={handleAddReview}
        />
      </div>
    </div>
  );
};

export default ClassDetailReview;
