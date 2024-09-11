import { useEffect, useState } from 'react';
import useBookingStore from '../../src/store/useBookingStore';
import { useClassStore } from '../store/useClassStore';
import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import ClassCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import ClassDetailSelectOption from '../components/classDetail/ClassDetailSelectOption';
import ClassDetailPolicy from '../components/classDetail/ClassDetailPolicy';
import { Class } from '../type/class.type';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailReview from '../components/classDetail/ClassDetailReview';
import ClassDetailQna from '../components/classDetail/ClassDetailQna';
import Button from '../components/common/Button';
import useReviewStore from '../store/useReviewStore';
import ClassDetailTopInfo from '../components/classDetail/ClassDetailTopInfo';

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const findOneClass = useClassStore((state) => state.findOneClass);
  const [classItemState, setClassItemState] = useState<Class | null>(null);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedClassType, setSelectedClassType] = useState<string | null>(
    null,
  );
  const [maxPerson, setMaxPerson] = useState<number | null>(null);
  const [showTimes, setShowTimes] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookingQuantity, setBookingQuantity] = useState<number>(1);
  const [selectLanguageType, setSelectLanguageType] = useState<string>('');

  // 리뷰 관련 state
  const reviews = useReviewStore((state) => state.reviews);
  const getReviews = useReviewStore((state) => state.getReviews);

  useEffect(() => {
    getReviews(Number(id));
  }, [getReviews, id]);

  useEffect(() => {
    if (id) {
      findOneClass(id)
        .then((data: Class | null) => {
          if (data) {
            setClassItemState(data);
            setAvailableTypes(
              Array.isArray(data.class_type)
                ? data.class_type
                : [data.class_type],
            );
            setMaxPerson(data.max_person || null);
            setAvailableDates(
              data.dates.map((date) => new Date(date.start_date)),
            );
          } else {
            console.error('No data found for the given ID');
          }
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            console.error('Error fetching class data:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up request:', error.message);
          }
        });
    }
  }, [id, findOneClass]);

  useEffect(() => {
    if (selectedDate) {
      setShowTimes(true);
    } else {
      setShowTimes(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (classItemState && selectedDate) {
      const filteredTimes = classItemState.dates
        .filter(
          (date) =>
            new Date(date.start_date).toDateString() ===
            selectedDate.toDateString(),
        )
        .map((date) => `${date.start_time} - ${date.end_time}`);

      setAvailableTimes(filteredTimes);
    }
  }, [classItemState, selectedDate]);

  const originalPrice =
    classItemState?.price || classItemState?.price_in_usd || 0;
  const discountRate = classItemState?.discount_rate || 0;
  const discountedPrice = originalPrice - (originalPrice * discountRate) / 100;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguageType(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassType(e.target.value);
  };

  const handleBookingClick = () => {
    if (!classItemState || !selectedDate || !selectedTime) {
      alert('Please select all required options');
      return;
    }

    const bookingData = {
      class_id: classItemState.id,
      class_date_id: selectedDate.getTime(),
      quantity: bookingQuantity,
      options: selectedClassType || '',
      amount: discountedPrice * bookingQuantity,
      title: classItemState.title,
    };

    useBookingStore.getState().addBookingItem(bookingData);
    navigate('/charge/');
  };

  const handleAdd = () => {
    navigate(`/reviewModal/${id}`);
  };

  if (!classItemState) return;

  return (
    <>
      <div>
        {classItemState && classItemState.images?.[0]?.detail_image_urls ? (
          <ClassDetailSlide
            slideImage={classItemState.images[0].detail_image_urls}
          />
        ) : (
          <div>No images available</div>
        )}
        <ClassDetailTopInfo classData={classItemState} reviews={reviews} />
        <ClassCalendar
          selectedDate={selectedDate}
          availableDates={availableDates}
          availableTypes={availableTypes}
          selectedClassType={selectedClassType}
          onTypeChange={setSelectedClassType}
          onDateChange={setSelectedDate}
        />
        <ClassDetailSelectOption
          selectLanguageType={selectLanguageType}
          handleLanguageChange={handleLanguageChange}
          availableTypes={availableTypes}
          selectedType={selectedClassType}
          handleTypeChange={handleTypeChange}
          maxPerson={maxPerson}
        />
        {showTimes && (
          <ClassDetailCalendarSlide onTimeSelect={setSelectedTime} />
        )}
        <ClassDetailOption
          discountedPrice={discountedPrice}
          bookingQuantity={bookingQuantity}
          setBookingQuantity={setBookingQuantity}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedClassType={selectedClassType}
          availableTimes={availableTimes}
          classPrice={discountedPrice}
          onBookNowClick={handleBookingClick}
        />
        <ClassDetailReview reviews={reviews} id={classItemState.id} />{' '}
        <div className="px-6 my-[30px]">
          <Button
            type="button"
            size="full"
            value="add your Review"
            onClick={handleAdd}
          />
        </div>
        <ClassDetailQna />
        <ClassDetailPolicy />
      </div>
    </>
  );
};

export default ClassDetail;
