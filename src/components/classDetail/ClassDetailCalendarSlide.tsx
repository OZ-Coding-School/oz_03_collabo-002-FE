import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useClassStore } from '../../store/useClassStore'; // zustand로부터 classDetails 가져오기
import { useParams } from 'react-router-dom';
import { IconCheck } from '../../config/IconData';

type Props = {
  onTimeSelect: (time: string | null) => void;
};

const ClassDetailCalendarSlide: React.FC<Props> = ({ onTimeSelect }) => {
  const { classDetails, fetchClassesTime } = useClassStore();
  const { id } = useParams<{ id: string }>();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetchClassesTime(id);
    }
  }, [id, fetchClassesTime]);

  const handleTimeSelect = (index: number) => {
    if (classDetails[index].status === 'Fully booked') return;

    // 이미 선택된 항목을 다시 클릭한 경우 선택 해제
    if (selectedIndex === index) {
      setSelectedIndex(null);
      onTimeSelect(null);
    } else {
      setSelectedIndex(index);
      onTimeSelect(classDetails[index].time);
    }
  };

  return (
    <div className="pl-[24px]">
      {classDetails.length === 0 ? (
        <p>No available class details</p>
      ) : (
        <Swiper
          slidesPerView={3.5}
          spaceBetween={10}
          className="mySwiper mt-[38px]"
          loop={classDetails.length > 1} // 슬라이드가 2개 이상일 때만 loop 활성화
        >
          {classDetails.map((classDetail, index) => (
            <SwiperSlide key={index}>
              <div
                className={`border px-[10px] py-[12px] rounded-lg text-left ${
                  classDetail.status === 'Fully booked'
                    ? 'border-gray-400 border bg-gray-100 select-none cursor-default'
                    : selectedIndex === index
                      ? 'border-primary border bg-[#FFF9E5] cursor-pointer'
                      : 'border-gray-400 border bg-white cursor-pointer'
                }`}
                onClick={() => handleTimeSelect(index)}
              >
                <p
                  className={`flex items-center text-xs mt-1 font-bold ${
                    classDetail.status === 'Fully booked'
                      ? 'text-red-600'
                      : selectedIndex === index
                        ? 'text-primary'
                        : 'text-gray-600'
                  }`}
                >
                  {selectedIndex === index && (
                    <IconCheck className="mr-1 text-primary" />
                  )}
                  {classDetail.status === 'Fully booked'
                    ? 'Fully booked'
                    : selectedIndex === index
                      ? 'Selected'
                      : 'Seats available'}
                </p>

                <p>
                  <strong>
                    {classDetail.seatsLeft}/{classDetail.seat}{' '}
                  </strong>
                </p>
                <p className="mt-[12px] text-[14px]">{classDetail.time}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ClassDetailCalendarSlide;
