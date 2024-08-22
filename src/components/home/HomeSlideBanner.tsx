import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

const HomeSlideBanner = () => {
  return (
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="./Home/SlideBanner/1.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/2.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/3.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/4.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/5.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/6.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/7.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/8.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/9.png" alt="slide image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./Home/SlideBanner/10.png" alt="slide image" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HomeSlideBanner;
