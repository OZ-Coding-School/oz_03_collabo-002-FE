import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useClassStore } from '../store/useClassStore';
import useReviewStore from '../store/useReviewStore';
import { Class } from '../type/class.type';
import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import ClassCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import ClassDetailSelectOption from '../components/classDetail/ClassDetailSelectOption';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailTopInfo from '../components/classDetail/ClassDetailTopInfo';
import { twJoin as tw } from 'tailwind-merge';
import ClassDetailContent from '../components/classDetail/ClassDetailContent';

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();

  // 클래스 관련 state
  const findOneClass = useClassStore((state) => state.findOneClass);
  const [classItemState, setClassItemState] = useState<Class | null>(null);

  // 클래스 옵션 관련 state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [bookingQuantity, setBookingQuantity] = useState<number>(1);
  const [availableTimes, setAvailableTimes] = useState<
    Array<{ id: string; time: string }>
  >([]);
  const [selectedSupportLanguage, setSelectedSupportLanguage] = useState('');
  const [selectedClassType, setSelectedClassType] = useState('');

  // 할인 가격 계산기
  const originalPrice = classItemState?.price_in_usd || 0;
  const discountRate = classItemState?.discount_rate || 0;
  const discountedPrice = originalPrice - (originalPrice * discountRate) / 100;

  // 리뷰 관련 state
  const reviews = useReviewStore((state) => state.reviews);
  const getReviews = useReviewStore((state) => state.getReviews);
  const reviewsRef = useRef<HTMLDivElement>(null);

  // 원데이 클래스 정보 받아오기
  const fetchClassData = useCallback(async () => {
    if (!id) return;
    try {
      const data = await findOneClass(id);
      if (data) {
        setClassItemState(data);
      } else {
        console.error('No data found for the given ID');
      }
    } catch (error) {
      console.error('Error fetching class data:', error);
    }
  }, [id, findOneClass]);

  useEffect(() => {
    fetchClassData();
    getReviews(Number(id));
  }, [fetchClassData, getReviews, id]);

  // 시간 선택 옵션 구현 로직
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setSelectedDateId(null);

    if (date && classItemState) {
      const selectedTimes = classItemState.dates
        .filter((d) => {
          const dDate = new Date(d.start_date);
          return dDate.toDateString() === date.toDateString();
        })
        .map((d) => ({
          id: d.id,
          time: `${d.start_time} - ${d.end_time}`,
        }));
      setAvailableTimes(selectedTimes);
    } else {
      setAvailableTimes([]);
    }
  };

  // 일정, 시간 선택하여 Dates 배열에서 해당하는 class_date_id 찾기 로직
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    if (classItemState && selectedDate) {
      const selectedDateObj = classItemState.dates.find((date) => {
        const dateObj = new Date(date.start_date);
        return (
          dateObj.getFullYear() === selectedDate.getFullYear() &&
          dateObj.getMonth() === selectedDate.getMonth() &&
          dateObj.getDate() === selectedDate.getDate() &&
          `${date.start_time} - ${date.end_time}` === time
        );
      });
      setSelectedDateId(selectedDateObj?.id || null);
    }
  };

  // 섹션으로 스크롤 이동 구현 로직
  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      const { top } = sectionRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top - 105, // -80px 만큼 조정
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    getReviews(Number(id));
  }, [getReviews, id]);

  if (!classItemState) return;

  return (
    <>
      <div>
        {classItemState && classItemState.images?.[0]?.detail_image_urls ? (
          <ClassDetailSlide
            slideImage={classItemState.images[0].detail_image_urls}
          />
        ) : (
          <div
            className={tw(
              'w-full aspect-square',
              'text-center content-center text-gray font-bold text-xl',
            )}
          >
            No images available
          </div>
        )}
        <ClassDetailTopInfo
          classData={classItemState}
          reviews={reviews}
          scrollToSection={scrollToSection}
          reviewsRef={reviewsRef}
        />
        <ClassCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateSelect}
          availableDates={classItemState.dates.map(
            (date) => new Date(date.start_date),
          )}
        />
        <ClassDetailSelectOption
          availableTypes={
            Array.isArray(classItemState.class_type)
              ? classItemState.class_type
              : [classItemState.class_type]
          }
          maxPerson={classItemState.max_person}
          selectedSupportLanguage={selectedSupportLanguage}
          selectedClassType={selectedClassType}
          setSelectedSupportLanguage={setSelectedSupportLanguage}
          setSelectedClassType={setSelectedClassType}
        />
        {selectedDate && (
          <ClassDetailCalendarSlide
            onTimeSelect={handleTimeSelect}
            availableTimes={availableTimes}
          />
        )}
        <ClassDetailOption
          discountedPrice={discountedPrice}
          bookingQuantity={bookingQuantity}
          setBookingQuantity={setBookingQuantity}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedDateId={selectedDateId}
          classItemState={classItemState}
          selectedSupportLanguage={selectedSupportLanguage}
          selectedClassType={selectedClassType}
        />
        <ClassDetailContent
          classData={classItemState}
          scrollToSection={scrollToSection}
          reviewsRef={reviewsRef}
        />
      </div>
    </>
  );
};

export default ClassDetail;
