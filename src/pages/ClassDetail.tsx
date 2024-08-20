import { useState, useRef } from 'react';
import GoodsDetailSlide from '../components/classDetail/ClassDetailSlide';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';
import {
  IconDetailHeart,
  IconDetailShare,
  IconOptionArw,
  IconReviewStar,
} from '../config/IconData';
import GoodsCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import { twJoin as tw } from 'tailwind-merge';

type ClassDetailProps = {
  rating: number;
};

const ClassDetail = ({ rating }: ClassDetailProps) => {
  const originalPrice = 14900;
  const discountedPrice = 12900;
  const [expanded, setExpanded] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [supportersLanguage, setSupportersLanguage] = useState<string | null>(
    null,
  );
  const [classType, setClassType] = useState<string | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const handleBookNowClick = () => {
    if (!supportersLanguage) {
      alert('Please select a Supporters Language Type before proceeding.');
    } else {
    }
  };

  const handleRemoveOption = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setClassType(null);
  };

  return (
    <div>
      <div className="pb-[80px]">
        <GoodsDetailSlide />
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
            <p className="text-primary text-[24px]">
              <strong>{originalPrice.toLocaleString()}원</strong>
            </p>
            <p className="text-gray-400 line-through ml-2 text-base">
              {discountedPrice.toLocaleString()}원
            </p>
          </div>
          <button
            className={tw(
              'w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center',
              'absolute top-[30px] right-[14px]',
            )}
            aria-label="찜하기"
          >
            <IconDetailShare />
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
      <div className="px-6">
        <div className="border border-1 border-gray-400 rounded-2xl pb-3">
          <GoodsCalendar onDateChange={setSelectedDate} />
        </div>
      </div>
      <div className="px-6">
        <div className="mt-[34px] relative">
          <select
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
            onChange={(e) => setSupportersLanguage(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Supporters Language Type
            </option>
            <option value="Language 1">Language 1</option>
            <option value="Language 2">Language 2</option>
            <option value="Language 3">Language 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>
        <div className="mt-[22px] relative">
          <select
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
            onChange={(e) => setClassType(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Class type
            </option>
            <option value="Class Type 1">Class Type 1</option>
            <option value="Class Type 2">Class Type 2</option>
            <option value="Class Type 3">Class Type 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>
        <div className="border border-1 border-gray-400 rounded-lg mt-[22px] py-[12px] px-[14px] flex justify-between text-gray-400">
          Minimum class size : 4 participants
        </div>
      </div>
      <ClassDetailCalendarSlide onTimeSelect={setSelectedTime} />
      <ClassDetailOption
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedClassType={classType}
        onBookNowClick={handleBookNowClick}
        onRemoveOptionClick={handleRemoveOption}
      />
      {/* ...나머지 코드 생략... */}
    </div>
  );
};

export default ClassDetail;
