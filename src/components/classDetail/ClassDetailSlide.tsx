import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

type ClassDetailSlideProps = {
  slideImage: string[] | null;
};
const ClassDetailSlide = ({ slideImage }: ClassDetailSlideProps) => {
  return (
    <div>
      <>
        <Swiper
          pagination={{
            type: 'fraction',
          }}
          modules={[Pagination]}
          className="mySwiper rounded-xl overflow-hidden"
        >
          {slideImage?.map((slide) => (
            <SwiperSlide key={slide} className="w-full h-fit">
              <img
                src={slide}
                alt={'finished work' + slide}
                className="w-full aspect-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default ClassDetailSlide;
