import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const GoodsDetailInfoSlide = () => {
  return (
    <div className="pl-[24px]">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        loop={true}
        className="mySwiper mt-[18px]"
      >
        <SwiperSlide>
          <img src="./images/img-sample2.jpg" alt="sample image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/img-sample2.jpg" alt="sample image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/img-sample2.jpg" alt="sample image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/img-sample2.jpg" alt="sample image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default GoodsDetailInfoSlide;
