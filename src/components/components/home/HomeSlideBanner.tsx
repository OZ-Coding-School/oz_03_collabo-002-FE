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
          <img src="./images/img-sample4.jpg" alt="sample image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/img-sample4.jpg" alt="sample image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/img-sample4.jpg" alt="sample image" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default HomeSlideBanner;
