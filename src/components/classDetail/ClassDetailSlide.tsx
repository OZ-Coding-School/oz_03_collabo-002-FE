import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

type ClassDetailSlideProps = {
  slideImage:
    | [
        {
          id: string;
          class_id: string;
          image_url: string;
        },
      ]
    | [];
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
          {slideImage.map((slide) => (

          <SwiperSlide key={slide.id} className='w-full h-fit'>
            <img src={slide.image_url} alt={'finished work' + slide.id} className='w-full h-[280px] object-cover'/>
          </SwiperSlide>
          ))}
          {/* <SwiperSlide>
            <img src="./images/img-sample.jpg" alt="sample image" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/img-sample.jpg" alt="sample image" />
          </SwiperSlide> */}
        </Swiper>
      </>
    </div>
  );
};

export default ClassDetailSlide;
