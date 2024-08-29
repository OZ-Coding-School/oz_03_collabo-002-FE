import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import { Review } from '../../type/review.type';
import { IconRemove } from '../../config/IconData';

type ReviewModalProps = {
  review: Review;
  setIsModalOpen: (a: boolean) => void;
};
const ReviewModal = ({ review, setIsModalOpen }: ReviewModalProps) => {
  return (
    <div className="relative h-fit">
      <Swiper
        modules={[Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
      >
        {review.images.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className="relative w-full h-fit">
              <img
                src={image.image_url}
                alt={`이미지 ${index + 1}`}
                className="w-full h-fit rounded-xl"
              />
              {/* 리뷰 글 보기 */}
              {/* <div className="absolute bottom-0 left-0 w-full p-4 bg-black bg-opacity-70 text-white rounded-b-xl line-clamp-2">
                {review.review_text}
              </div> */}
              <div className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-30 rounded-xl" />
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button onClick={() => setIsModalOpen(false)} className='absolute p-1 right-2 top-2 z-50 bg-white/50 rounded-full '><IconRemove className='text-black'/></button>
    </div>
  );
};

export default ReviewModal;
