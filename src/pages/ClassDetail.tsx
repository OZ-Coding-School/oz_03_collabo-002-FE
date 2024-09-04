import { useState, useRef, useEffect } from 'react';
import {
  IconDetailShare,
  IconOptionArw,
  IconReviewStar,
  IconMoreArw,
  IconMapShare,
} from '../config/IconData';
import { twJoin as tw } from 'tailwind-merge';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import ClassCalendar from '../components/classDetail/ClassCalendar';
import useBookingStore from '../../src/store/useBookingStore';
import useClassStore, { findOneClass } from '../store/useClassStore';
import { useParams } from 'react-router-dom';
import ClassDetailQna from '../components/classDetail/ClassDetailQna';

type ClassDetailProps = {
  rating: number;
};

const ClassDetail = ({ rating }: ClassDetailProps) => {
  const originalPrice = 14900;
  const discountedPrice = 12900;
  const { id: classId } = useParams<{ id: string }>();

  // 상태 관리
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedClassType, setSelectedClassType] = useState<string | null>(
    null,
  );
  const [selectLanguageType, setSelectLanguageType] = useState('');
  const [maxPerson, setMaxPerson] = useState<number | null>(null);
  const [isReservationVisible, setIsReservationVisible] = useState(false);
  const [isCancelationVisible, setIsCancelationVisible] = useState(false);
  const [isThingsToKeepInMindVisible, setIsThingsToKeepInMindVisible] =
    useState(false);

  const addBookingItem = useBookingStore((state) => state.addBookingItem); // 상태 관리 훅

  // 클래스 상세 정보와 최대 인원 데이터 가져오기
  const loadClassDetail = async () => {
    if (!classId) return; // classId가 없으면 리턴

    try {
      const detail = await findOneClass(classId);
      console.log('API에서 받아온 클래스 정보:', detail);

      if (!detail) {
        console.error('Class not found for id:', classId);
        return;
      }

      // 클래스 유형 설정
      if (detail.class_type) {
        const types = Array.isArray(detail.class_type)
          ? detail.class_type
          : [detail.class_type];
        setAvailableTypes(types);
      }

      // 최대 인원 설정
      setMaxPerson(detail.max_person || null);
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };
  console.log('현재 classId:', classId); // 콘솔에 출력하여 확인

  useEffect(() => {
    loadClassDetail(); // 컴포넌트가 마운트될 때 클래스 정보를 불러옵니다.
  }, [classId]);

  // 예약 정보 저장
  const handleBookingClick = () => {
    const bookingData = {
      language: selectLanguageType,
      class: selectedClassType ?? '',
      time: selectedTime ?? '',
      date: selectedDate,
    };
    addBookingItem(bookingData);
  };

  // 스크롤 이동 함수
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth',
      });
    }
  };

  // 기타 기능 함수들
  const toggleImageSize = () => setExpanded(!expanded);
  const toggleLike = () => setIsLiked(!isLiked);
  const handleDateChange = (date: Date | null) => setSelectedDate(date);
  const handleClassTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedClassType(e.target.value);
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectLanguageType(e.target.value);

  // 레퍼런스
  const detailsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const resPoliciesRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className="pb-[80px]">
        <ClassDetailSlide />
        <div className="relative px-6">
          <p className="text-[13px] text-gray-400 font-bold pt-[14px]">
            클래스 카테고리
          </p>
          <strong className="text-[32px] font-normal">상품 클래스 이름</strong>
          <p className="flex items-center">
            <IconReviewStar />
            &nbsp;{rating}
            <span className="text-gray-400">(00개)</span>
          </p>
          <div className="mt-4 text-2xl flex items-center">
            <p className="text-[#D91010] font-[20px] text-bold mr-2">28%</p>
            <p className="text-primary text-[24px]">
              <strong>{originalPrice.toLocaleString()}원</strong>
            </p>
            <p className="text-gray-400 line-through ml-2 text-base">
              {discountedPrice.toLocaleString()}원
            </p>
          </div>
          <button
            className={tw(
              'w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center absolute top-[30px] right-[14px]',
            )}
            aria-label="찜하기"
            onClick={toggleLike}
          >
            <IconDetailShare
              className={isLiked ? 'fill-primary' : 'fill-none'}
            />
          </button>
        </div>
        <GoodsDetailInfoSlide />
      </div>

      <div className="px-6">
        <div className="border border-1 border-gray-400 rounded-2xl pb-3">
          <ClassCalendar onDateChange={handleDateChange} />
        </div>

        {/* 기타 정보 및 선택 사항들 */}
        <div className="mt-[34px] relative">
          <select
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
            onChange={handleLanguageChange}
          >
            <option>Supporters Language Type</option>
            <option>English</option>
            <option>Korean</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>

        <div className="mt-[22px] relative">
          <select
            value={selectedClassType || ''}
            onChange={handleClassTypeChange}
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
          >
            <option value="">Select class type</option>
            {availableTypes.length === 0 ? (
              <option disabled>Loading class types...</option>
            ) : (
              availableTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>

        <div className="border border-1 border-gray-400 rounded-lg mt-[22px] py-[12px] px-[14px] flex justify-between text-gray-400">
          {maxPerson !== null
            ? `Maximum participants: ${maxPerson}`
            : 'Loading max participants...'}
        </div>
      </div>

      <ClassDetailCalendarSlide onTimeSelect={setSelectedTime} />
      <ClassDetailOption
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedClassType={selectedClassType}
        onBookNowClick={handleBookingClick}
        onRemoveOptionClick={() => {
          setSelectedDate(null);
          setSelectedTime(null);
          setSelectedClassType(null);
        }}
        onBookingButtonClick={handleBookingClick}
      />

      {/* 예약 및 취소 정책 */}
      <div ref={resPoliciesRef} className="mt-20">
        <dl className="border-t border-t-1 border-t-gray-300">
          <dt className="px-6 py-7 text-[18px] font-semibold flex items-center justify-between">
            Reservation Process
            <button
              onClick={() => setIsReservationVisible(!isReservationVisible)}
            >
              <IconOptionArw
                className={`${isReservationVisible ? 'rotate-180' : ''} transition`}
              />
            </button>
          </dt>
          {isReservationVisible && (
            <dd className="px-6 py-7 pl-10 border-t border-t-1 border-t-gray-300">
              <strong>Reservation Process</strong>
              <ol className="list-decimal">
                <li>
                  Select 'Reserve' on the spot page and book your desired date
                  and number of participants.
                </li>
                <li>
                  Once your reservation is made, it will be confirmed within 2-3
                  days.
                </li>
                <li>
                  Ensure you arrive at the designated meeting point 10 minutes
                  before the scheduled time. The class will start promptly.
                </li>
                <li>
                  Please gather at <strong>Mad Night</strong>
                </li>
              </ol>
              <p className="mt-3">
                {`105 Gangbyeon Shopping Center, Seoul`} {/* 예시 주소 */}
              </p>
            </dd>
          )}
        </dl>

        <dl className="border-t border-t-1 border-t-gray-300">
          <dt className="px-6 py-7 text-[18px] font-semibold flex items-center justify-between">
            Cancelation Policy
            <button
              onClick={() => setIsCancelationVisible(!isCancelationVisible)}
            >
              <IconOptionArw
                className={`${isCancelationVisible ? 'rotate-180' : ''} transition`}
              />
            </button>
          </dt>
          {isCancelationVisible && (
            <dd className="px-6 py-7 pl-10 border-t border-t-1 border-t-gray-300">
              <strong>Cancelation Policy</strong>
              <ul className="list-disc">
                <li>4 days before the class: Full refund</li>
                <li>3 days before the class: 50% refund</li>
                <li>2 days before the class: No refund</li>
              </ul>
              <p>
                The cancellation fee policy is based on the class provider's
                business days.
              </p>
            </dd>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ClassDetail;
