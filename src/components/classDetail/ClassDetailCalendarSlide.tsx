import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
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
      {classDetails.length === 0 ? (
        <p>No available class details</p>
      ) : (
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
                      ? 'text-primary' // 선택된 경우
                      : classDetail.status === 'Fully booked' // 인원이 꽉 찬 경우
                        ? 'text-[#D91010]' // 스타일 적용 (빨간색)
                        : 'text-gray-600' // 그 외의 경우
                  }`}
                >
                  {classDetail.status === 'Fully booked'
                    ? 'Fully booked'
                    : 'Seats available'}
                  {/* 상태 텍스트 */}
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
      )}
    </div>
  );
};

export default ClassDetailCalendarSlide;
