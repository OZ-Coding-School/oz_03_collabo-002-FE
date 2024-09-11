import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { IconCheck } from '../../config/IconData';

type ClassDetailCalendarSlideProps = {
  onTimeSelect: (time: string) => void;
  availableTimes: Array<{ id: string; time: string }>;
};

const ClassDetailCalendarSlide = ({
  onTimeSelect,
  availableTimes,
}: ClassDetailCalendarSlideProps) => {
  // const { classDetails, fetchClassesTime } = useClassStore();
  // const { id } = useParams<{ id: string }>();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // useEffect(() => {
  //   if (id) {
  //     fetchClassesTime(id);
  //   }
  // }, [id, fetchClassesTime]);

  const handleTimeSelect = (index: number) => {
    // if (classDetails[index].status === 'Fully booked') return;

    // 이미 선택된 항목을 다시 클릭한 경우 선택 해제
    if (selectedIndex === index) {
      setSelectedIndex(null);
      onTimeSelect('');
    } else {
      setSelectedIndex(index);
      onTimeSelect(availableTimes[index].time);
    }
  };

  return (
    <div className="pl-6">
      {availableTimes.length === 0 ? (
        <p className='mt-10 mr-6 h-[100px] text-center content-center border border-gray-400 rounded-lg text-darkgray'>No available times for the selected date</p>
      ) : (
        <Swiper
          slidesPerView={3.5}
          spaceBetween={10}
          className="mySwiper mt-10"
          loop={availableTimes.length > 1}
        >
          {availableTimes.map((timeSlot, index) => (
            <SwiperSlide key={timeSlot.id}>
              <div
                className={`border px-[10px] py-[12px] rounded-lg text-left ${
                  selectedIndex === index
                    ? 'border-primary border bg-[#FFF9E5] cursor-pointer'
                    : 'border-gray-400 border bg-white cursor-pointer'
                }`}
                onClick={() => handleTimeSelect(index)}
              >
                <p
                  className={`flex items-center text-xs mt-1 font-bold ${
                    selectedIndex === index ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {selectedIndex === index && (
                    <IconCheck className="mr-1 text-primary" />
                  )}
                  {selectedIndex === index ? 'Selected' : 'Seats available'}
                </p>
                <p className="mt-[12px] text-[14px]">{timeSlot.time}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ClassDetailCalendarSlide;
