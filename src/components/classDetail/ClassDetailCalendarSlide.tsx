import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IconDetailChecked } from '../../config/IconData';
import axios from 'axios'; // axios import

type Status = 'Selected' | 'Fully booked' | 'Seats available';

type ClassDetail = {
  status: Status;
  seatsLeft: number;
  time: string;
  seat: number;
};

type Class = {
  id: number;
  // ... Class의 다른 속성들
};

type Props = {
  onTimeSelect: (time: string) => void;
};

// 시간 블록을 생성하는 함수
export const generateTimeBlocks = (
  startTime: string,
  endTime: string,
): string[] => {
  const blocks: string[] = [];
  const parseTime = (time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now;
  };

  let start = parseTime(startTime);
  const end = parseTime(endTime);

  while (start < end) {
    const next = new Date(start.getTime() + 120 * 60000); // 2시간 추가
    const timeBlock = `${start.toTimeString().slice(0, 5)} - ${next
      .toTimeString()
      .slice(0, 5)}`;
    blocks.push(timeBlock);
    start = next;
  }

  return blocks;
};

const ClassDetailCalendarSlide: React.FC<Props> = ({ onTimeSelect }) => {
  const [classDetails, setClassDetails] = useState<ClassDetail[]>([]); // ClassDetail[] 상태
  const [classes, setClasses] = useState<Class[]>([]); // Class[] 상태
  const generateClassDetails = (
    start_time: string,
    end_time: string,
    person: number,
  ) => {
    const timeBlocks = generateTimeBlocks(start_time, end_time);

    const generatedClassDetails = timeBlocks.map((timeBlock, index) => ({
      status: index === 0 ? 'Selected' : ('Seats available' as Status), // Status 타입으로 지정
      seatsLeft: 15 - person,
      seat: 15,
      time: timeBlock,
    }));

    setClassDetails(generatedClassDetails); // ClassDetails 상태에 업데이트
  };

  // 데이터를 API에서 가져오는 함수 정의
  const fetchClassData = async () => {
    try {
      // API에서 클래스 데이터를 가져옵니다 (URL은 실제 API에 맞게 변경)
      const response = await axios.get(
        'https://your-api-url.com/api/classes/1',
      ); // 실제 API URL로 변경
      const data = response.data;

      if (data.status === 'success') {
        const { start_time, end_time, person } = data.data.dates[0]; // 예시로 첫 번째 날짜 데이터 사용

        // 시간 블록 생성 및 상태 업데이트
        generateClassDetails(start_time, end_time, person);
      } else {
        console.error(
          'API에서 데이터를 가져오는 데 실패했습니다:',
          data.message,
        );
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchClassData(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

  const handleTimeSelect = (index: number) => {
    const updatedClassDetails = classDetails.map((detail, idx) => {
      if (idx === index) {
        return { ...detail, status: 'Selected' as Status };
      }
      return detail.status === 'Selected'
        ? { ...detail, status: 'Seats available' as Status }
        : detail;
    });

    setClassDetails(updatedClassDetails);
    onTimeSelect(updatedClassDetails[index].time);
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
                  : 'border-primary border bg-[#FFF9E5] cursor-pointer'
              }`}
              onClick={() => {
                if (classDetail.status !== 'Fully booked') {
                  handleTimeSelect(index);
                }
              }}
            >
              <p
                className={`text-[10px] mt-[3px] font-bold ${
                  classDetail.status === 'Selected'
                    ? 'text-primary'
                    : classDetail.status === 'Fully booked'
                      ? 'text-[#D91010]'
                      : 'text-gray-600'
                }`}
              >
                {classDetail.status}
                {classDetail.status === 'Selected' && (
                  <IconDetailChecked className="inline-block ml-1" />
                )}
              </p>
              <p>
                <strong>
                  {classDetail.seatsLeft}/{classDetail.seat}
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
