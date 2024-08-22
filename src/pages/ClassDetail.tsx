import { useState, useRef } from 'react';
import {
  IconDetailShare,
  IconMapShare,
  IconMoreArw,
  IconOptionArw,
  IconReviewStar,
} from '../config/IconData';
import { twJoin as tw } from 'tailwind-merge';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import ClassDetailPhotoReview from '../components/classDetail/ClassDetailPhotoReview';
import ClassDetailReview from '../components/classDetail/ClassDetailReview';
import '../components/classDetail/ClassDetail.css';
import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import ClassCalendar from '../components/classDetail/ClassCalendar';

type ClassDetailProps = {
  rating: number;
};

// ClassDetailOption 컴포넌트의 Props 타입 정의를 수정
// type ClassDetailOptionProps = {
//   selectedDate: Date | null | undefined;
//   selectedTime: string | null | undefined;
//   selectedClassType: string | null | undefined;
//   onBookNowClick: () => void;
//   onRemoveOptionClick: () => void;
// };

const ClassDetail = ({ rating }: ClassDetailProps) => {
  const originalPrice = 14900;
  const discountedPrice = 12900;
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(
    undefined,
  );
  const [selectedTime, setSelectedTime] = useState<string | null | undefined>(
    undefined,
  );
  const [selectedClassType, setSelectedClassType] = useState<
    string | null | undefined
  >(undefined);
  const [isReservationVisible, setIsReservationVisible] = useState(false);
  const [isCancelationVisible, setIsCancelationVisible] = useState(false);
  const [isThingsToKeepInMindVisible, setIsThingsToKeepInMindVisible] =
    useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const resPoliciesRef = useRef<HTMLDivElement>(null);

  const stickyOffset = 58;
  const headerOffset = 80;

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

  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
  }

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const handleBookNowClick = () => {
    console.log('Book Now clicked');
  };

  const handleClassTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedClassType(event.target.value);
  };

  const handleRemoveOptionClick = () => {
    setSelectedDate(undefined);
    setSelectedTime(null);
    setSelectedClassType(null);
  };

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
      <div className="px-6">
        <div className="border border-1 border-gray-400 rounded-2xl pb-3">
          <ClassCalendar onDateChange={handleDateChange} />
        </div>
      </div>
      <div className="px-6">
        <div className="mt-[34px] relative">
          <select className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative">
            <option>Supporters Language Type</option>
            <option>Supporters Language Type</option>
            <option>Supporters Language Type</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>
        <div className="mt-[22px] relative">
          <select
            className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative"
            onChange={handleClassTypeChange}
          >
            <option>class type1</option>
            <option>class type2</option>
            <option>class type3</option>
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
        selectedDate={selectedDate ?? null}
        selectedTime={selectedTime ?? null}
        selectedClassType={selectedClassType ?? null}
        onBookNowClick={handleBookNowClick}
        onRemoveOptionClick={handleRemoveOptionClick}
      />
      <div className="mt-20 sticky top-[58px] bg-white z-20">
        <ul
          className={tw(
            'flex items-center w-full justify-around mt-[30px] py-3',
            'border-t border-t-1 border-black border-b border-b-1 border-b-gray-300',
          )}
        >
          <li className="flex-1">
            <button
              onClick={() => scrollToSection(detailsRef)}
              className="flex items-center justify-center w-full h-full"
            >
              Details
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => scrollToSection(reviewsRef)}
              className="flex items-center justify-center w-full h-full"
            >
              Review(999+)
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => scrollToSection(qaRef)}
              className="flex items-center justify-center w-full h-full"
            >
              Q&A
            </button>
          </li>
          <li className="flex-1">
            <button
              onClick={() => scrollToSection(resPoliciesRef)}
              className="flex items-center justify-center w-full h-full"
            >
              Res. & Policies
            </button>
          </li>
        </ul>
      </div>

      <div ref={detailsRef} className="mt-[100px] mb-10">
        <div>
          <img
            src="./images/img-sample3.jpg"
            alt="sample img"
            className={`w-full ${expanded ? '' : 'max-h-[500px]'} object-cover`}
            style={{ maxHeight: expanded ? 'none' : '500px' }}
          />
        </div>
        <button
          type="button"
          className="border border-primary text-primary rounded-3xl w-full py-4 mt-4 flex justify-center"
          onClick={toggleImageSize}
        >
          More Details
          <IconMoreArw className={`${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div
        ref={reviewsRef}
        className="mt-10 pt-10 border-t border-t-1 border-t-gray-300"
      >
        <h3 className="text-[20px] px-6 font-semibold">Location</h3>
        <div></div>
        <div className="px-6 py-7 text-[14px] relative">
          <p>
            <strong>We Open Class Here</strong>
          </p>
          <p className="text-gray-500">
            10, Dosin-ro 17-gil, Yeongdeungpo-gu,
            <br /> Seoul, Republic of Korea
          </p>
          <button
            type="button"
            className="absolute right-6 top-6 border border-gray-300 rounded-full p-3"
          >
            <IconMapShare className="" />
          </button>
        </div>
      </div>

      <div
        ref={qaRef}
        className="mt-10 pt-10 border-t border-t-1 border-t-gray-300"
      >
        <div className="text-center mb-4">
          <strong className="flex items-center justify-center text-[20px] font-semibold">
            <div className="flex mr-1">
              {[...Array(5)].map((_, i) => (
                <IconReviewStar key={i} className="" />
              ))}
            </div>
            <span className="text-primary">320</span>&nbsp;reviews
          </strong>
          <p className="text-[14px] leading-[34px]">
            <strong className="text-primary">97%</strong> of participants are
            satisfied with the workshop!
          </p>
        </div>
        <ClassDetailPhotoReview />
        <ClassDetailReview />
        <dl>
          <dt>Reservation Process</dt>
          <dd>
            <ol>
              <li>
                Select 'Reserve' on the spot page and book your desired date and
                number of participants.
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
            <p>
              Mad Night 2nd Floor, Building A, Mad Night, 52 Songpa-daero
              49-gil, Songpa-gu, Seoul
            </p>
          </dd>
        </dl>
        <dl>
          <dt>Cancelation Policy</dt>
          <dd>
            <strong>Cancelation Policy</strong>
            <ul>
              <li>4 days before the class: Full refund</li>
              <li>3 days before the class: 50% refund </li>
              <li>2 days before the class: No refund </li>
            </ul>
            <p>
              The cancellation fee policy is based on the class provider's
              business days.
            </p>
            <p>
              If a cancellation request is made on non-business days, the
              cancellation fee will be applied based on the next business day.
            </p>
            <p>(Non-business days: weekends and public holidays)</p>
          </dd>
        </dl>
        <dl>
          <dt>Things To Keep In Mind</dt>
          <dd>
            <ul>
              <li>
                If the class is canceled due to the provider's circumstances,
                you will be notified by email 1-2 days in advance.
              </li>
              <li>
                Please arrive 10 minutes before the class starts. Latecomers
                will not be accommodated.
              </li>
              <li>This class is held indoors.</li>
              <li>
                The class requires a minimum of 2 participants & maximum of 10
                participants to proceed.
              </li>
              <li>
                This is not a private class and will include participants from
                various countries. However, instruction will be given in
                English, Japanese, Chinese, and Korean. (Please inform us in
                advance which language you need.)
              </li>
              <li>
                Reservation confirmations may take 2-3 days on the provider's
                non-business days (weekends and public holidays). For example,
                if you book on a Friday, the confirmation will be processed
                after Monday.
              </li>
              <li>
                The class will proceed as scheduled even in rainy weather, and
                no refunds will be provided for weather-related cancellations
                during the class.
              </li>
              <li>
                Recording or filming the instructor's explanations during the
                class is prohibited.
              </li>
              <li>
                Pets are not allowed, and there are no facilities for them.
              </li>
              <li>
                If you have dietary restrictions or allergies, please inform us
                in advance.
              </li>
              <li>
                Cancellations and refunds due to natural disasters are not
                possible, but date changes are allowed.
              </li>
              <li>
                For reservation changes or other inquiries, please contact
                customk7878@gmail.com.
              </li>
            </ul>
          </dd>
        </dl>
      </div>

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
                Mad Night 2nd Floor, Building A, Mad Night, 52 Songpa-daero
                49-gil, Songpa-gu, Seoul
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
                <li>4 days before the class:Full refund</li>
                <li>3 days before the class:50% refund </li>
                <li>2 days before the class:No refund </li>
              </ul>
              <p>
                The cancellation fee policy is based on the class provider's
                business days.
              </p>
              <p>
                If a cancellation request is made on non-business days, the
                cancellation fee will be applied based on the next business day.
              </p>
              <p>(Non-business days: weekends and public holidays)</p>
            </dd>
          )}
        </dl>

        <dl className="border-t border-t-1 border-t-gray-300 border-b border-b-1 border-b-gray-300">
          <dt className="px-6 py-7 text-[18px] font-semibold flex items-center justify-between">
            Things To Keep In Mind
            <button
              onClick={() =>
                setIsThingsToKeepInMindVisible(!isThingsToKeepInMindVisible)
              }
            >
              <IconOptionArw
                className={`${isThingsToKeepInMindVisible ? 'rotate-180' : ''} transition`}
              />
            </button>
          </dt>
          {isThingsToKeepInMindVisible && (
            <dd className="px-6 py-7 pl-10 border-t border-t-1 border-t-gray-300">
              <ul className="list-disc">
                <li>
                  If the class is canceled due to the provider's circumstances,
                  you will be notified by email 1-2 days in advance.
                </li>
                <li>
                  Please arrive 10 minutes before the class starts. Latecomers
                  will not be accommodated.
                </li>
                <li>This class is held indoors.</li>
                <li>
                  The class requires a minimum of 2 participants & maximum of 10
                  participants to proceed.
                </li>
                <li>
                  This is not a private class and will include participants from
                  various countries. However, instruction will be given in
                  English, Japanese, Chinese, and Korean. (Please inform us in
                  advance which language you need.)
                </li>
                <li>
                  Reservation confirmations may take 2-3 days on the provider's
                  non-business days (weekends and public holidays). For example,
                  if you book on a Friday, the confirmation will be processed
                  after Monday.
                </li>
                <li>
                  The class will proceed as scheduled even in rainy weather, and
                  no refunds will be provided for weather-related cancellations
                  during the class.
                </li>
                <li>
                  Recording or filming the instructor's explanations during the
                  class is prohibited.
                </li>
                <li>
                  Pets are not allowed, and there are no facilities for them.
                </li>
                <li>
                  If you have dietary restrictions or allergies, please inform
                  us in advance.
                </li>
                <li>
                  Cancellations and refunds due to natural disasters are not
                  possible, but date changes are allowed.
                </li>
                <li>
                  For reservation changes or other inquiries, please contact
                  customk7878@gmail.com.
                </li>
              </ul>
            </dd>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ClassDetail;
