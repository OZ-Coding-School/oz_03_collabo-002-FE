import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

type ClassDetailSlideProps = {
  slideImage: string[] | null;
};

const ClassDetailSlide = ({ slideImage }: ClassDetailSlideProps) => {
  if (!slideImage || slideImage.length === 0) {
    return <div className="text-center">No images available</div>;
  }

  return (
    <div>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        modules={[Pagination]}
        className="mySwiper overflow-hidden"
      >
        {slideImage.map((slide) => (
          <SwiperSlide key={slide} className="w-full">
            <img
              src={slide}
              alt={'finished work ' + slide}
              className="w-full aspect-square object-cover object-left-top"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClassDetailSlide;
