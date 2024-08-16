import emptyStar from '../../icon/empty-star.svg';
import fullStar from '../../icon/full-star.svg';
import emptyHeart from '../../icon/empty-heart.svg';
import fullHeart from '../../icon/full-heart.svg';
import { Reviews } from '../../type/types';
import { useState } from 'react';

interface ReviewProps {
  review: Reviews;
}

// 날짜 포맷 변환 함수
const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 작성`;
};

const ReviewItem: React.FC<ReviewProps> = ({ review }) => {
  const stars = [1, 2, 3, 4, 5];
  const [isLiked, setIsLiked] = useState<boolean | null>(false);
  const [count, setCount] = useState<number>(review.likes_count);

  const handleHeart = () => {
    setIsLiked((prevLiked) => {
      const newLiked = !prevLiked;
      setCount((prevCount) => (newLiked ? prevCount + 1 : prevCount - 1));
      return newLiked;
    });
  };

  const imageCount = review.images.length;
  const extraImagesCount = imageCount > 3 ? imageCount - 3 : 0;

  return (
    <>
      <div key={review.review_id} className="my-5 mx-2">
        <div className="flex items-center mb-3">
          <img
            src={review.user.profile_image}
            alt={`${review.user.name} profile`}
            className="w-9 h-9 rounded-full"
          />
          <div className="flex flex-col mx-3">
            <p className="font-semibold text-sm">{review.user.name}</p>
            <div className="flex items-center">
              <p className="flex">
                {stars.map((star, index) => (
                  <img
                    key={index}
                    src={star <= review.rating ? fullStar : emptyStar}
                    alt={`${star} 점`}
                    className="w-4 h-4 mr-1"
                  />
                ))}
              </p>
              <span className="ml-3 text-[9px] text-gray mt-1">
                {formatDate(review.created_at)}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm mb-2">{review.review_text}</p>
        <div className="flex justify-between">
          <p className="text-[10px] text-gray">
            [일반과정] 칵테일 : 노멀 만들기 클래스
          </p>
          <div className="border-[1.5px] w-16 flex rounded-2xl justify-center py-1 gap-1 items-center">
            <img
              src={isLiked ? emptyHeart : fullHeart}
              alt="좋아요"
              onClick={handleHeart}
              className="cursor-pointer"
            />
            <span className="text-[11px]">{count}</span>
          </div>
        </div>
        <div className="flex gap-2 relative">
          {review.images.slice(0, 3).map((image, index) => (
            <div
              key={image.image_id}
              className={`relative ${index === 2 && imageCount > 3 ? 'opacity-50' : ''}`}
            >
              <img
                src={image.image_url}
                alt="이미지 첨부 사진"
                className="w-20 h-20"
              />
              {index === 2 && imageCount > 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-xs font-bold">
                  +{extraImagesCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <hr className="border-b-1" />
    </>
  );
};

export default ReviewItem;
