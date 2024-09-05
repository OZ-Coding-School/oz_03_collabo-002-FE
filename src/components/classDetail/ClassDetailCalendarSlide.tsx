import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IconDetailChecked } from '../../config/IconData';
import useClassStore from '../../store/useClassStore';
import { useParams } from 'react-router-dom';

type Props = {
  onTimeSelect: (time: string | null) => void; // 선택 해제 시 null 전달
};

const ClassDetailCalendarSlide: React.FC<Props> = ({ onTimeSelect }) => {
  const { classDetails, fetchClassesTime } = useClassStore();
  const { id } = useParams<{ id: string }>();

  // 선택된 시간을 추적하는 state 추가
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      fetchClassesTime(id);
      console.log('13');
    }
  }, [id, fetchClassesTime]);

  const handleTimeSelect = (index: number) => {
    if (classDetails[index].status === 'Fully booked') return;

    // 이미 선택된 항목을 다시 클릭한 경우 선택 해제
    if (selectedIndex === index) {
      setSelectedIndex(null);
      onTimeSelect(null); // 선택 해제 시 null 전달
    } else {
      setSelectedIndex(index);
      onTimeSelect(classDetails[index].time); // 선택된 시간 전달
    }
  };

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
              className={`border px-[10px] py-[12px] rounded-lg text-left ${
                classDetail.status === 'Fully booked'
                  ? 'border-gray-400 border bg-gray-100 select-none cursor-default'
                  : selectedIndex === index
                    ? 'border-primary border bg-[#FFF9E5] cursor-pointer'
                    : 'border-gray-400 border bg-white cursor-pointer'
              }`}
              onClick={() => handleTimeSelect(index)} // 선택된 인덱스 업데이트
            >
              <p
                className={`text-[10px] mt-[3px] font-bold ${
                  selectedIndex === index
                    ? 'text-primary'
                    : classDetail.status === 'Fully booked'
                      ? 'text-[#D91010]'
                      : 'text-gray-600'
                }`}
              >
                {/* 선택된 항목은 "Selected", 그 외는 "Seats available" 표시 */}
                {selectedIndex === index ? 'Selected' : 'Seats available'}
                {selectedIndex === index && (
                  <IconDetailChecked className="inline-block ml-1" />
                )}
              </p>
              <p>
                <strong>
                  {classDetail.seatsLeft}/{classDetail.seat}{' '}
                  {/* 좌석 수 표시 */}
                </strong>
              </p>
              <p className="mt-[12px] text-[14px]">{classDetail.time}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClassDetailCalendarSlide;
