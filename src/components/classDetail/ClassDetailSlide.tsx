import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

type ClassDetailSlideProps = {
  slideImage: string[] | null | undefined;
};

const ClassDetailSlide = ({ slideImage }: ClassDetailSlideProps) => {
  if (!slideImage || slideImage.length === 0) {
    return <div className="text-center">No images available</div>;
  }

  return (
    <Swiper
      pagination={{
        type: 'fraction',
      }}
      modules={[Pagination]}
      className="mySwiper overflow-hidden w-full aspect-square"
    >
      {slideImage.map((slide, index) => (
        <SwiperSlide key={index} className="w-full">
          <img
            src={slide}
            alt="Finished work"
            className="w-full aspect-square object-cover object-left-top"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClassDetailSlide;
