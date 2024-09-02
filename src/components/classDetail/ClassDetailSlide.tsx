import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const ClassDetailSlide = () => {
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
          <SwiperSlide>
            <img src="../../images/img-sample.jpg" alt="sample image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/img-sample.jpg" alt="sample image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="../../images/img-sample.jpg" alt="sample image" />
          </SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default ClassDetailSlide;
