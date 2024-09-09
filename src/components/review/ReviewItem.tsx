// import { useState } from 'react';
// import emptyStar from '../../assets/icon/empty-star.svg';
// import fullStar from '../../assets/icon/full-star.svg';
// import emptyHeart from '../../assets/icon/empty-heart.svg';
// import fullHeart from '../../assets/icon/full-heart.svg';
import { useEffect, useState } from 'react';
import { IconReviewStar } from '../../config/IconData';
import ReviewReviewModal from './ReviewPhotoModal';
import { Review } from '../../type/review.type';
import { useClassStore } from '../../store/useClassStore';
import { useUserStore } from '../../store/useUser';
import { Class } from '../../type/class.type';
import ModalReviewWrite from '../common/ModalReviewWrite';
import useReviewStore from '../../store/useReviewStore';

interface ReviewProps {
  review: Review;
  // setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  // isUpdate: boolean;
  classId?: string | undefined;
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

const ReviewItem = ({ review, classId }: ReviewProps) => {
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
  const classTitle = useClassStore((state) => state.classItem);
  const [activePhoto, setActivePhoto] = useState(true);
  const imageCount = review.images ? review.images.length : 0;
  const user = useUserStore((state) => state.user);
  const extraImagesCount = imageCount > 3 ? imageCount - 3 : 0;
  const fetchClasses = useClassStore((state) => state.fetchClasses);
  const [clickedReviewId, setClickedReviewId] = useState<string | number>('');
  const [openWrite, setOpenWrite] = useState<boolean>(false);
  const isUpdate = useReviewStore((state) => state.setIsUpdate);
  const isDelete = useReviewStore((state) => state.setIsDelete);

  useEffect(() => {
    if (user) {
      // console.log('user: ', user);
      // console.log('user: ', user.id);
    }
  }, [user]);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    if (!path.includes('review')) {
      setActivePhoto(false);
    } else {
      setActivePhoto(true);
      // console.log('user: ', user);
    }
  }, [path]);

  useEffect(() => {
    console.log('review: ', review);
  }, [review]);

  // class_id에 해당하는 클래스 제목 찾기
  const classInfo = Array.isArray(classTitle)
    ? classTitle.find((item: Class) => item.id === review.class_id)
    : null;

  const className = classInfo
    ? classInfo.title
    : '클래스 정보를 찾을 수 없습니다';

  const handleEdit = async () => {
    try {
      // setIsUpdate(true);
      setOpenWrite(true);
      isUpdate();
      console.log('hi');
      console.log('review의 id: ', review.id);
      setClickedReviewId(review.id);
      return;
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const handleDelete = async () => {
    // try {
    //   // const response = await axios.delete(
    //   //   `reviews/${classId}/update/${review.id}`,
    //   // );
    //   // console.log('delete response: ', response);
    //   await axios.delete(`reviews/${classId}/update/${review.id}`);
    // } catch (error) {
    //   console.log('error: ', error);
    // }
    // try {
    //   isDelete(Number(classId), Number(review.id));
    // } catch (error) {
    //   console.log('filter delete error: ', error);
    // }
    isDelete(Number(classId), Number(review.id));
  };

  // console.log(review);

  return (
    <>
      {openWrite && (
        <ModalReviewWrite
          // setIsUpdate={setIsUpdate}
          // isUpdate={isUpdate}
          reviews={review.id}
          clickedReviewId={clickedReviewId}
        />
      )}
      <div key={review.id} className="py-[15px] px-6">
        {/* 작성자 정보 */}
        <div className="flex items-center mb-3">
          <img
            src={review.user.profile_image_url || '/images/user-empty.png'}
            alt={`${review.user.name}_profile`}
            className="w-12 h-12 rounded-full"
          />
          <div className="w-full flex flex-col mx-3">
            <div className="w-full flex justify-between">
              <strong className="font-semibold">{review.user.name}</strong>
              <span className="ml-3 text-xs text-gray mt-1">
                {formatDate(review.created_at)}
              </span>
            </div>
            <div className="flex items-center justify-between">
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
                {review.rating}
              </p>
              {user?.id === review.user.id ? (
                <div className="ml-3 text-xs  mt-1">
                  <button className="text-blue-600" onClick={handleEdit}>
                    edit
                  </button>
                  <span> | </span>
                  <button className="text-red" onClick={handleDelete}>
                    delete
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <p className="text-sm mb-2">{review.review}</p>
        {/* 클래스 정보 */}
        <div className="flex justify-between p-2">
          <p className="text-sm text-gray">{className}</p>
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
        {activePhoto && review.images && review.images.length > 0 ? (
          <div className="w-full flex my-[10px] gap-[15px] relative">
            {review.images.length > 0 &&
              review.images.slice(0, 3).map((image, index) => (
                <div
                  key={index + String(image.id)}
                  className={`relative w-[130px] h-[130px] ${
                    index === 2 && imageCount > 3 ? 'opacity-50' : ''
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt="이미지 첨부 사진"
                    className="w-full h-full rounded-xl object-cover"
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
