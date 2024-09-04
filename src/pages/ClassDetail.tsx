import { useState, useRef, useEffect } from 'react';
import {
  IconDetailShare,
  IconOptionArw,
  IconReviewStar,
} from '../config/IconData';
import { twJoin as tw } from 'tailwind-merge';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import '../components/classDetail/ClassDetail.css';
import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import ClassCalendar from '../components/classDetail/ClassCalendar';
import useBookingStore from '../../src/store/useBookingStore';
import { BookingData } from '../../src/store/useBookingStore';
import useClassStore, { findOneClass } from '../store/useClassStore';
import { ClassState } from '../type/class';
import { useParams } from 'react-router-dom';

type ClassDetailProps = {
  rating: number;
};

const ClassDetail = ({ rating }: ClassDetailProps) => {
  const originalPrice = 14900;
  const discountedPrice = 12900;
  const { id: classId } = useParams<{ id: string }>();
  const params = useParams<{ id: string }>();

  // 상태들
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

  const loadClassDetail = async () => {
    const detail = await findOneClass(classId); // classId로 API에서 클래스 정보를 불러옴
    console.log('findOneClass 호출, classId:', classId); // classId가 제대로 전달되는지 확인
    console.log('API 응답 데이터:', detail); // API 응답 데이터 확인

    if (!detail) {
      console.error('Class not found for id:', classId);
      return;
    }

    // class_type이 있는 경우 availableTypes 상태를 업데이트
    if (detail && detail.class_type) {
      const availableTypes = Array.isArray(detail.class_type)
        ? detail.class_type
        : [detail.class_type];
      setAvailableTypes(availableTypes); // 상태 업데이트
    }

    // max_person 데이터 업데이트
    if (detail && detail.max_person) {
      setMaxPerson(detail.max_person); // maxPerson 상태 업데이트
    }
  };

  // 컴포넌트가 렌더링될 때 데이터를 불러오기 위한 useEffect
  useEffect(() => {
    loadClassDetail();
  }, [classId]);

  // 상태에 데이터를 모아서 BookingData로 저장
  let gatheredBookingData = {} as BookingData;

  const fetchMaxPerson = useClassStore(
    (state: ClassState) => state.fetchMaxPerson,
  );
  useEffect(() => {
    const getMaxPerson = async () => {
      if (classId) {
        const result = await fetchMaxPerson(classId); // fetchMaxPerson 호출
        console.log('Max Person Result:', result); // 여기에 출력해 확인
        setMaxPerson(result); // 상태에 저장
      }
    };

    getMaxPerson();
  }, [classId, fetchMaxPerson]);

  useEffect(() => {
    const getMaxPerson = async () => {
      if (classId) {
        const result = await fetchMaxPerson(classId); // fetchMaxPerson 호출
        setMaxPerson(result); // 상태에 저장
      }
    };

    getMaxPerson();
  }, [classId, fetchMaxPerson]);

  useEffect(() => {
    const loadClassDetail = async () => {
      const detail = await findOneClass(classId); // classId를 이용해 클래스 정보를 가져옴

      if (detail && detail.class_type) {
        const availableTypes = Array.isArray(detail.class_type)
          ? detail.class_type
          : [detail.class_type];
        setAvailableTypes(availableTypes); // 직접 availableTypes 설정
      }
    };

    loadClassDetail();
  }, [classId]);

  // 기타 레퍼런스들
  const detailsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const resPoliciesRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const stickyOffset = 58;
  const headerOffset = 80;

  // 이미지 토글 함수
  const toggleImageSize = () => {
    if (!expanded && buttonRef.current) {
      const { top } = buttonRef.current.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + top,
        behavior: 'smooth',
      });
    }
    setExpanded(!expanded);
  };

  // 스크롤 이동 함수
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - stickyOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // "찜하기" 클릭 시 호출
  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  // 예약 정보 저장
  const addBookingItem = useBookingStore((state) => state.addBookingItem);

  const handleButtonClick = () => {
    addBookingItem(gatheredBookingData);
  };

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // 클래스 타입 변경 핸들러
  const handleClassTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClassType(e.target.value);
  };

  // 언어 타입 변경 핸들러
  const ChangeLanguageType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguageType(e.target.value);
  };

  // 예약 버튼 클릭
  const handleBookNowClick = () => {
    console.log('Book Now clicked');
  };

  // 옵션 제거 핸들러
  const handleRemoveOptionClick = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedClassType(null);
  };

  // 예약 데이터 업데이트
  useEffect(() => {
    gatheredBookingData = {
      language: selectLanguageType,
      class: selectedClassType ?? '',
      time: selectedTime ?? '',
      date: selectedDate,
    };
  }, [selectLanguageType, selectedClassType, selectedTime, selectedDate]);

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
              'w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center',
              'absolute top-[30px] right-[14px]',
            )}
            aria-label="찜하기"
            onClick={toggleLike}
          >
            <IconDetailShare
              className={isLiked ? 'fill-primary' : 'fill-none'}
            />
          </button>
        </div>
        <div className="mt-10 px-6">
          <h3 className="text-[18px] font-medium">
            Details of the Workshop Piece
          </h3>
          <p className="text-[13px] mt-[10px]">
            - 1 Standard Cocktail + 1 Signature Cocktail
            <br />
            - You can create your own Cocktail by choosing from 60 different
            ingredients.
            <br />- You can inquire in advance about creating your desired
            cocktail.
          </p>
        </div>
        <GoodsDetailInfoSlide />
      </div>

      {/* 날짜 선택 컴포넌트 */}
      <div className="px-6">
        <div className="border border-1 border-gray-400 rounded-2xl pb-3">
          <ClassCalendar onDateChange={handleDateChange} />
        </div>
      </div>

      {/* 기타 정보 및 선택 사항들 */}
      <div className="px-6">
        <div className="mt-[34px] relative">
          <select
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
            onChange={ChangeLanguageType}
          >
            <option>Supporters Language Type</option>
            <option>Supporters Language Type</option>
            <option>Supporters Language Type</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>

        {/* 클래스 타입 선택 */}
        <div className="mt-[22px] relative">
          <select
            value={''}
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

        {/* 최대 참여 인원 */}
        <div className="border border-1 border-gray-400 rounded-lg mt-[22px] py-[12px] px-[14px] flex justify-between text-gray-400">
          Minimum class size :
          {maxPerson !== null ? (
            <>Maximum class size: {maxPerson} participants</>
          ) : (
            <>Loading maximum participants data...</>
          )}
        </div>
      </div>

      <ClassDetailCalendarSlide onTimeSelect={setSelectedTime} />
      <ClassDetailOption
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedClassType={selectedClassType} // selectedClassType 전달
        onBookNowClick={handleBookNowClick} // Book Now 클릭 핸들러 전달
        onRemoveOptionClick={handleRemoveOptionClick} // 옵션 제거 핸들러 전달
        onBookingButtonClick={handleButtonClick}
      />

      {/* 나머지 UI 요소들 (리뷰, 예약 정책 등) */}
    </div>
  );
};

export default ClassDetail;
