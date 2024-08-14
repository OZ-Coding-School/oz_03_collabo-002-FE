import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IconDetailChecked } from '../../config/IconData';

type Status = 'Selected' | 'Fully booked' | 'Seats available';

type ClassDetail = {
  status: Status;
  seatsLeft: number;
  time: string;
  seat: number;
};

const classDetails: ClassDetail[] = [
  { status: 'Selected', seatsLeft: 0, seat: 15, time: '12:00 - 13:30' },
  { status: 'Fully booked', seatsLeft: 0, seat: 15, time: '14:00 - 15:30' },
  { status: 'Seats available', seatsLeft: 12, seat: 15, time: '16:00 - 17:30' },
  { status: 'Seats available', seatsLeft: 5, seat: 15, time: '18:00 - 19:30' },
];

const getStatusLabel = (status: Status): string => {
  switch (status) {
    case 'Selected':
      return 'Selected';
    case 'Fully booked':
      return 'Fully booked';
    case 'Seats available':
      return 'Seats available';
    default:
      return '';
  }
};

const getStatusClass = (status: Status): string => {
  switch (status) {
    case 'Selected':
      return 'border-primary border bg-[#FFF9E5] cursor-pointer';
    case 'Fully booked':
      return 'border-gray-400 border bg-gray-100 select-none cursor-default';
    case 'Seats available':
      return 'border-gray-400 border bg-white cursor-pointer';
    default:
      return '';
  }
};

const getStatusLabelClass = (status: Status): string => {
  switch (status) {
    case 'Selected':
      return 'font-bold text-primary';
    case 'Fully booked':
      return 'font-bold text-[#D91010]';
    case 'Seats available':
      return 'font-bold text-gray-600';
    default:
      return 'font-bold text-primary';
  }
};

const ClassDetailCalendarSlide = () => {
  return (
    <div className="pl-[24px]">
      <Swiper
        slidesPerView={3.5}
        spaceBetween={10}
        className="mySwiper mt-[38px]"
      >
        {classDetails.map((classDetail, index) => (
          <SwiperSlide key={index}>
            <div
              className={`border px-[10px] py-[12px] rounded-lg ${getStatusClass(classDetail.status)}`}
            >
              <p
                className={`text-[10px] mt-[3px] ${getStatusLabelClass(classDetail.status)}`}
              >
                {getStatusLabel(classDetail.status)}
                {classDetail.status === 'Selected' && (
                  <IconDetailChecked className="inline-block ml-1" />
                )}
              </p>
              <p>
                <strong>
                  {classDetail.seatsLeft > 0
                    ? `${classDetail.seatsLeft}/${classDetail.seat}`
                    : `${classDetail.seatsLeft}/${classDetail.seat}`}
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
