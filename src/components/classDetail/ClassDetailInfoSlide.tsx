import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

type GoodsDetailInfoSlideProps = {
  scrollImage:
    | [
        {
          id: string;
          class_id: string;
          image_url: string;
        },
      ]
    | [];
};

const GoodsDetailInfoSlide = ({ scrollImage }: GoodsDetailInfoSlideProps) => {
  return (
    <div className="pl-6">
      <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        loop={true}
        className="mySwiper mt-[18px]"
      >
        {scrollImage
          ? scrollImage.map((item) => (
              <SwiperSlide key={item.id} className="h-[120px]">
                <img
                  src={item.image_url}
                  alt={'finished work' + item.id}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))
          : null}
        {/* <SwiperSlide>
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
        </SwiperSlide> */}
      </Swiper>
    </div>
  );
};

export default GoodsDetailInfoSlide;
