import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IconDetailChecked } from '../../config/IconData';

type Status = '선택' | '품절' | '모집중';

type ClassDetail = {
  status: Status;
  seatsLeft: number;
  time: string;
};

const classDetails: ClassDetail[] = [
  { status: '선택', seatsLeft: 0, time: '12:00 - 13:30' },
  { status: '품절', seatsLeft: 0, time: '14:00 - 15:30' },
  { status: '모집중', seatsLeft: 12, time: '16:00 - 17:30' },
  { status: '모집중', seatsLeft: 5, time: '18:00 - 19:30' },
];

const getStatusLabel = (status: Status): string => {
  switch (status) {
    case '선택':
      return '선택';
    case '품절':
      return '품절';
    case '모집중':
      return '모집중';
    default:
      return '';
  }
};

const getStatusClass = (status: Status): string => {
  switch (status) {
    case '선택':
      return 'border-primary border bg-[#FFF9E5]';
    case '품절':
      return 'border-gray-600 border bg-gray-100 select-none cursor-default';
    case '모집중':
      return 'border-gray-600 border bg-white';
    default:
      return '';
  }
};

const getStatusLabelClass = (status: Status): string => {
  switch (status) {
    case '선택':
      return 'font-bold text-primary';
    case '품절':
      return 'font-bold text-[#D91010]';
    case '모집중':
      return 'font-bold text-gray-600';
    default:
      return 'font-bold text-primary';
  }
};

const ClassDetailCalendarSlide = () => {
  return (
    <div className="pl-[18px]">
      <Swiper
        slidesPerView={3.5}
        spaceBetween={10}
        className="mySwiper mt-[38px]"
      >
        {classDetails.map((classDetail, index) => (
          <SwiperSlide key={index}>
            <div
              className={`border px-[10px] py-[12px] rounded-lg cursor-pointer ${getStatusClass(classDetail.status)}`}
            >
              <p
                className={`text-[10px] mt-[3px] ${getStatusLabelClass(classDetail.status)}`}
              >
                {getStatusLabel(classDetail.status)}
                {classDetail.status === '선택' && (
                  <IconDetailChecked className="inline-block ml-1" />
                )}
              </p>
              <p>
                <strong>
                  {classDetail.seatsLeft > 0
                    ? `${classDetail.seatsLeft}자리 남음`
                    : '0자리 남음'}
                </strong>
              </p>
              <p className="mt-[12px]">{classDetail.time}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClassDetailCalendarSlide;
