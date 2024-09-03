import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

type GoodsDetailInfoSlideProps = {
  scrollImage: string[] | null;
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
              <SwiperSlide key={item} className="h-[120px]">
                <img
                  src={item}
                  alt={'finished work' + item}
                  className="w-full h-full object-cover rounded-md"
                />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default GoodsDetailInfoSlide;
