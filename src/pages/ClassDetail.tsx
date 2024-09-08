import { useEffect, useRef, useState } from 'react';
import useBookingStore from '../../src/store/useBookingStore';
import useClassStore from '../store/useClassStore';
import { useParams } from 'react-router-dom';
import ClassDetailSlide from '../components/classDetail/ClassDetailSlide';
import {
  IconMapShare,
  IconMoreArw,
  IconOptionArw,
  IconReviewStar,
} from '../config/IconData';
import { twJoin } from 'tailwind-merge';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';
import ClassCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import ClassDetailPhotoReview from '../components/classDetail/ClassDetailPhotoReview';
import ClassDetailReview from '../components/classDetail/ClassDetailReview';
import { Class } from '../type/class.type';

const originalPrice = 14900; // 원래 가격
const discountedPrice = 12900; // 할인된 가격
type ClassDetailProps = {
  rating: number;
};

const ClassDetail = ({ rating }: ClassDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const [classData, setClassData] = useState<Class | null>(null);
  const findOneClass = useClassStore((state) => state.findOneClass);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [expanded, setExpanded] = useState(false); // expanded 상태 추가

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchClass = async () => {
      if (id) {
        const data = await findOneClass(id);
        if (data) {
          setClassData({
            ...data,
            name: data.title, // title을 name으로 변환
          });
        }
      }
    };
    fetchClass();
  }, [id, findOneClass]);

  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedClassType, setSelectedClassType] = useState<string | null>(
    null,
  );
  const [isReservationVisible, setIsReservationVisible] = useState(false);
  const [isThingsToKeepInMindVisible, setIsThingsToKeepInMindVisible] =
    useState(false);
  const [isCancelationVisible, setIsCancelationVisible] = useState(false);

  const [selectLanguageType, setSelectLanguageType] = useState<string>('');
  const [maxPerson, setMaxPerson] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const qaRef = useRef<HTMLDivElement>(null);
  const resPoliciesRef = useRef<HTMLDivElement>(null);
  const addBookingItem = useBookingStore((state) => state.addBookingItem);
  const [selectedType, setSelectedType] = useState<string | null>(null); // 선택된 타입
  const [showTimes, setShowTimes] = useState(false); // 슬라이드를 보여줄지 여부를 결정하는 상태

  useEffect(() => {
    const loadClassDetail = async () => {
      if (!id) return;
      try {
        const detail = await findOneClass(id);
        if (!detail) return;

        if (detail.class_type) {
          const types = Array.isArray(detail.class_type)
            ? detail.class_type
            : [detail.class_type];
          setAvailableTypes(types);
        }
        setMaxPerson(detail.max_person || null);
        if (detail.dates && detail.dates.length > 0) {
          setAvailableDates(
            detail.dates.map(
              (date: { start_date: string }) => new Date(date.start_date),
            ),
          );
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };
    loadClassDetail();
  }, [id, findOneClass]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
  };

  const handleBookingClick = () => {
    const bookingData = {
      language: selectLanguageType,
      class: selectedClassType ?? '',
      time: selectedTime ?? '',
      date: selectedDate,
    };
    addBookingItem(bookingData);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectLanguageType(e.target.value);
  };

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
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

  const handleCopy = () => {
    if (typeof classData?.address === 'string') {
      navigator.clipboard
        .writeText(classData.address)
        .then(() => {
          alert('Address copied to clipboard.');
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate); // 상태를 직접 업데이트
    if (newDate) {
      setShowTimes(true); // 날짜가 선택되면 슬라이드 표시
    } else {
      setShowTimes(false); // 날짜가 선택되지 않으면 슬라이드 숨기기
    }
  };

  if(!classData) return null;
  
  return (
    <>
      <div>
        <div className="pb-[80px]">
          <ClassDetailSlide
            slideImage={classData.images[0]?.thumbnail_image_urls}
          />
          <div className="relative px-6">
            <p className="text-[13px] text-gray-400 font-bold pt-[14px]">
              클래스 카테고리
            </p>
            <strong className="text-[32px] font-normal">
              상품 클래스 이름
            </strong>
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
            {/* <button
              className={twJoin(
                'w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center absolute top-[30px] right-[14px]',
              )}
              aria-label="공유하기"
            >
              <IconDetailShare
                className={isLiked ? 'fill-primary' : 'fill-none'}
              />
            </button> */}
          </div>
          <GoodsDetailInfoSlide scrollImage={classData.images[0]?.description_image_urls} />
        </div>

        <div className="px-6">
          <div className="border border-1 border-gray-400 rounded-2xl pb-3">
            <ClassCalendar
              selectedDate={selectedDate}
              availableDates={availableDates}
              availableTypes={availableTypes}
              selectedClassType={selectedClassType}
              onDateChange={handleDateChange}
              onTypeChange={setSelectedClassType}
            />
          </div>
        </div>

        {/* 언어 선택 드롭다운 */}
        <div className="mt-[22px] relative mx-6">
          <select
            value={selectLanguageType} // 상태 값을 드롭다운과 연결
            onChange={handleLanguageChange} // 변경 핸들러 연결
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
            </select>{' '}
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
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        selectedClassType={selectedClassType}
        onBookNowClick={handleBookingClick}
      />
      {/* Main Section */}
      <>
        {/* detail title */}
        <div className="mt-20 sticky top-[57px] bg-white z-20">
          <ul
            className={twJoin(
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
        {/* Detail */}
        <div ref={detailsRef} className="mb-10">
          <div
            className={`w-full overflow-hidden ${expanded ? '' : 'max-h-[500px]'}`}
            style={{ maxHeight: expanded ? 'none' : '500px' }}
          >
            {classData?.images?.[0]?.detail_image_urls?.length ? (
              classData.images[0].detail_image_urls.map((url: string) => (
                <img
                  src={url}
                  alt={url}
                  key={url}
                  className="w-full object-contain"
                />
              ))
            ) : (
              <p className="text-center py-5">No detailed images available.</p>
            )}
          </div>

          <button
            type="button"
            className="border border-primary z-10 relative text-primary rounded-3xl w-full py-4 mt-4 flex justify-center"
            onClick={toggleImageSize}
          >
            More Details
            <IconMoreArw className={`${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Review */}
        <div
          ref={reviewsRef}
          className="mt-10 pt-10 border-t border-t-1 border-t-gray-300"
        >
          <h3 className="text-[20px] px-6 font-semibold">Location</h3>
          <div></div>
          <div className="relative px-6 py-7 text-[14px] ">
            <p>
              <strong>We Open Class Here</strong>
            </p>
            <p className="text-gray-500 pr-20">
              {typeof classData?.address === 'string' ? classData.address : ''}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-6 top-10 border border-gray-300 rounded-full p-3"
            >
              <IconMapShare className="" />
            </button>
          </div>
        </div>
        {/* QnA */}
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
        </div>
        {/* Res. Policy */}
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
                    Once your reservation is made, it will be confirmed within
                    2-3 days.
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
                  {typeof classData?.address === 'string'
                    ? classData.address
                    : ''}
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
                <p>
                  If a cancellation request is made on non-business days, the
                  cancellation fee will be applied based on the next business
                  day.
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
                    If the class is canceled due to the provider's
                    circumstances, you will be notified by email 1-2 days in
                    advance.
                  </li>
                  <li>
                    Please arrive 10 minutes before the class starts. Latecomers
                    will not be accommodated.
                  </li>
                  <li>This class is held indoors.</li>
                  <li>
                    The class requires a minimum of 2 participants & maximum of
                    10 participants to proceed.
                  </li>
                  <li>
                    This is not a private class and will include participants
                    from various countries. However, instruction will be given
                    in English, Japanese, Chinese, and Korean. (Please inform us
                    in advance which language you need.)
                  </li>
                  <li>
                    Reservation confirmations may take 2-3 days on the
                    provider's non-business days (weekends and public holidays).
                    For example, if you book on a Friday, the confirmation will
                    be processed after Monday.
                  </li>
                  <li>
                    The class will proceed as scheduled even in rainy weather,
                    and no refunds will be provided for weather-related
                    cancellations during the class.
                  </li>
                  <li>
                    Recording or filming the instructor's explanations during
                    the class is prohibited.
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
      </>
    </>
  );
};

export default ClassDetail;
