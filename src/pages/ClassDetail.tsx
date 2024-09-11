import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClassStore } from '../store/useClassStore';
import useReviewStore from '../store/useReviewStore';
import { Class } from '../type/class.type';
import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import ClassCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import ClassDetailSelectOption from '../components/classDetail/ClassDetailSelectOption';
import ClassDetailPolicy from '../components/classDetail/ClassDetailPolicy';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailReview from '../components/classDetail/ClassDetailReview';
import ClassDetailQna from '../components/classDetail/ClassDetailQna';
import ClassDetailTopInfo from '../components/classDetail/ClassDetailTopInfo';
import Button from '../components/common/Button';
import { twJoin as tw } from 'tailwind-merge';

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 클래스 관련 state
  const findOneClass = useClassStore((state) => state.findOneClass);
  const [classItemState, setClassItemState] = useState<Class | null>(null);

  // 클래스 옵션 관련 state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null);
  const [bookingQuantity, setBookingQuantity] = useState<number>(1);

  // 리뷰 관련 state
  const reviews = useReviewStore((state) => state.reviews);
  const getReviews = useReviewStore((state) => state.getReviews);

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
  };

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

  // 리뷰 등록 모달 구현 로직
  const handleAddReview = () => {
    navigate(`/reviewModal/${id}`);
  };

  // 클래스 정보 state
  const [maxPerson, setMaxPerson] = useState<number | null>(null);
  const [showTimes, setShowTimes] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // 할인 가격 계산기
  const originalPrice =
    classItemState?.price || classItemState?.price_in_usd || 0;
  const discountRate = classItemState?.discount_rate || 0;
  const discountedPrice = originalPrice - (originalPrice * discountRate) / 100;

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
              'text-center content-center text-gray font-bold text-xl'
              
            )}
          >
            No images available
          </div>
        )}
        <ClassDetailTopInfo classData={classItemState} reviews={reviews} />
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
        />
        {selectedDate && (
          <ClassDetailCalendarSlide onTimeSelect={handleTimeSelect} />
        )}
        <ClassDetailOption
          discountedPrice={discountedPrice}
          bookingQuantity={bookingQuantity}
          setBookingQuantity={setBookingQuantity}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedDateId={selectedDateId}
          classItemState={classItemState}
        />
        <ClassDetailReview reviews={reviews} id={classItemState.id} />
        <div className="px-6 my-[30px]">
          <Button
            type="button"
            size="full"
            value="add your Review"
            onClick={handleAddReview}
          />
        </div>
        <ClassDetailPolicy />
      </div>
    </>
  );
};

export default ClassDetail;
