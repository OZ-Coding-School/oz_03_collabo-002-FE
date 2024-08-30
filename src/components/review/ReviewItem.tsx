// import { useState } from 'react';
// import emptyStar from '../../assets/icon/empty-star.svg';
// import fullStar from '../../assets/icon/full-star.svg';
// import emptyHeart from '../../assets/icon/empty-heart.svg';
// import fullHeart from '../../assets/icon/full-heart.svg';
import { useEffect, useState } from 'react';
import { IconReviewStar } from '../../config/IconData';
import ReviewReviewModal from './ReviewPhotoModal';
import { Review } from '../../type/review.type';

interface ReviewProps {
  review: Review;
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

const ReviewItem = ({ review }: ReviewProps) => {
  // const stars = [1, 2, 3, 4, 5];
  // const [isLiked, setIsLiked] = useState<boolean | null>(false);
  // const [count, setCount] = useState<number>(review.likes_count);

  // const handleHeart = () => {
  //   setIsLiked((prevLiked) => {
  //     const newLiked = !prevLiked;
  //     setCount((prevCount) => (newLiked ? prevCount + 1 : prevCount - 1));
  //     return newLiked;
  //   });
  // };
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(true);
  const imageCount = review.images.length;
  const extraImagesCount = imageCount > 3 ? imageCount - 3 : 0;

  useEffect(() => {
    if (!path.includes('review')) {
      setActivePhoto(false);
    } else {
      setActivePhoto(true);
    }
  }, [path]);

  return (
    <>
      <div key={review.id} className="py-[15px] px-6">
        {/* 작성자 정보 */}
        <div className="flex items-center mb-3">
          <img
            src={review.user.profile_url}
            alt={`${review.user.name} profile`}
            className="w-12 h-12 rounded-full"
          />
          <div className="w-full flex flex-col mx-3">
            <div className="w-full flex justify-between">
              <strong className="font-semibold">{review.user.name}</strong>
              <span className="ml-3 text-xs text-gray mt-1">
                {formatDate(review.created_at)}
              </span>
            </div>
            <div className="flex items-center">
              <p className="flex items-center">
                <IconReviewStar className="mr-2" />
                {/* {stars.map((star, index) => (
                  <img
                    key={index}
                    src={star <= review.rating ? fullStar : emptyStar}
                    alt={`${star} 점`}
                    className="w-4 h-4 mr-1"
                  />
                ))} */}
                {review.rating.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm mb-2">{review.review_text}</p>
        {/* 클래스 정보 */}
        <div className="flex justify-between p-2">
          <p className="text-sm text-gray">
            [일반과정] 칵테일 : 노멀 만들기 클래스
            {/* review.class_type */}
          </p>
          {/* <div className="border-[1.5px] w-16 flex rounded-2xl justify-center py-1 gap-1 items-center">
            <img
              src={isLiked ? fullHeart : emptyHeart}
              alt="좋아요"
              onClick={handleHeart}
              className="cursor-pointer"
            />
            <span className="text-[11px]">{count}</span>
          </div> */}
        </div>
        {/* 포토 리뷰 */}
        {activePhoto ? (
          <div className="w-full flex my-[10px] gap-[15px] relative">
            {review.images.slice(0, 3).map((image, index) => (
              <div
                key={index + image.image_url}
                className={`relative w-1/3 aspect-square ${index === 2 && imageCount > 3 ? 'opacity-50' : ''}`}
              >
                <img
                  src={image.image_url}
                  alt="이미지 첨부 사진"
                  className="min-w-full min-h-full rounded-xl object-cover" // 너비 또는 높이 중 작은 값을 기준으로 나머지 부분을 자름
                />
                {index === 2 && imageCount > 3 && (
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-xs font-bold rounded-xl"
                  >
                    +{extraImagesCount}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : null}
        {isModalOpen ? (
          <div className="absolute w-full h-full left-0 top-0 flex bg-black/80 z-30 ">
            <div className="m-auto w-3/4 h-fit z-40">
              <ReviewReviewModal
                key={review.id}
                review={review}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
        ) : null}
      </div>
      {/* <hr className="border-b-1" /> */}
    </>
  );
};

export default ReviewItem;
