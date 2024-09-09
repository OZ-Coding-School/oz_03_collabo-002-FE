import { useEffect, useState } from 'react';
import useBookingStore from '../../src/store/useBookingStore';
import { useClassStore } from '../store/useClassStore';

import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import { IconOptionArw, IconReviewStar } from '../config/IconData';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';

import ClassCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import { Class } from '../type/class.type';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

type ClassDetailProps = {
  rating: number;
};

const ClassDetail = ({ rating }: ClassDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const findOneClass = useClassStore((state) => state.findOneClass);
  const [classItemState, setClassItemState] = useState<Class | null>(null);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedClassType, setSelectedClassType] = useState<string | null>(
    null,
  );
  const [selectLanguageType, setSelectLanguageType] = useState<string>('');
  const [maxPerson] = useState<number | null>(null);
  const addBookingItem = useBookingStore((state) => state.addBookingItem);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showTimes, setShowTimes] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [bookingQuantity, setBookingQuantity] = useState<number>(1); // 예약 수량 관리

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const originalPrice =
    classItemState?.price || classItemState?.price_in_usd || 0;
  const discountRate = classItemState?.discount_rate || 0;
  const discountedPrice = originalPrice - (originalPrice * discountRate) / 100;

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
  };

  // const calculateDiscountedPrice = (
  //   originalPrice: number,
  //   discountRate: number,
  // ) => {
  //   if (discountRate === 0) return originalPrice;
  //   return Math.ceil(originalPrice * (1 - discountRate / 100));
  // };

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

    addBookingItem(bookingData);
    navigate('/charge/');
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguageType(e.target.value);
  };

  return (
    <>
      <div>
        <div className="pb-[80px]">
          {/* 이미지가 있을 때만 슬라이드 렌더링 */}
          {classItemState?.images &&
          classItemState.images[0]?.detail_image_urls?.length > 0 ? (
            <ClassDetailSlide
              slideImage={classItemState.images[0].detail_image_urls}
            />
          ) : (
            <div>No images available</div>
          )}

          <div className="relative px-6">
            <p className="text-[13px] text-gray-400 font-bold pt-[14px]">
              {Array.isArray(classItemState?.category) &&
              classItemState.category.length > 0
                ? classItemState.category.join(', ')
                : classItemState?.category || ''}
            </p>
            <strong className="text-[32px] font-normal">
              {classItemState?.title || ''}
            </strong>
            <p className="flex items-center">
              <IconReviewStar />
              &nbsp;{rating}
            </p>

            <div className="mt-4 text-2xl flex items-center">
              {originalPrice > 0 ? (
                <>
                  {discountRate > 0 && (
                    <p className="text-[#D91010] text-[20px] font-bold mr-2">
                      {discountRate}%
                    </p>
                  )}
                  <p className="text-primary text-[24px]">
                    <strong>{discountedPrice.toLocaleString()}원</strong>
                  </p>
                  {discountRate > 0 && (
                    <p className="text-gray-400 line-through ml-2 text-base">
                      {originalPrice.toLocaleString()}원
                    </p>
                  )}
                </>
              ) : null}
            </div>
          </div>
          <GoodsDetailInfoSlide scrollImage={[]} />
        </div>

        <div className="px-6">
          <div className="border border-1 border-gray-400 rounded-2xl pb-3">
            <ClassCalendar
              selectedDate={selectedDate}
              availableDates={availableDates}
              availableTypes={availableTypes}
              selectedClassType={selectedClassType}
              onTypeChange={setSelectedClassType}
              onDateChange={setSelectedDate}
            />
          </div>
        </div>

        {/* 언어 선택 드롭다운 */}
        <div className="mt-[22px] relative mx-6">
          <select
            value={selectLanguageType}
            onChange={handleLanguageChange}
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
          >
            <option value="">Supporters Language Type</option>
            <option value="Korean">Korean</option>
            <option value="English">English</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>

        {/* 클래스 타입 선택 드롭다운 */}
        {availableTypes.length > 0 && (
          <div className="mt-[22px] relative mx-6">
            <select
              className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
              id="classType"
              value={selectedType ?? ''}
              onChange={handleTypeChange}
            >
              <option>Select Class Type</option>
              {availableTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <IconOptionArw />
            </div>
          </div>
        )}

        {/* 최대 인원 표시 */}
        <div className="border border-1 border-gray-400 rounded-lg mx-6 mt-[22px] py-[12px] px-[14px] flex justify-between text-gray-400">
          {maxPerson !== null
            ? `Minimum class size ${maxPerson} participants`
            : 'Loading max participants...'}
        </div>
      </div>

      {showTimes && <ClassDetailCalendarSlide onTimeSelect={setSelectedTime} />}
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
    </>
  );
};

export default ClassDetail;
