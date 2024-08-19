import GoodsDetailSlide from '../components/classDetail/ClassDetailSlide';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';
import {
  IconAllArw,
  IconDetailHeart,
  IconMapShare,
  IconMoreArw,
  IconOptionArw,
  IconReviewStar,
} from '../config/IconData';
import GoodsCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';
import ClassDetailOption from '../components/classDetail/ClassDetailOption';
import { twJoin as tw } from 'tailwind-merge';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import ClassDetailPhotoReview from '../components/classDetail/ClassDetailPhotoReview';
import ClassDetailReview from '../components/classDetail/ClassDetailReview';
type ClassDetailProps = {
  rating: number;
};
const ClassDetail = ({ rating }: ClassDetailProps) => {
  const originalPrice = 14900;
  const discountedPrice = 12900;
  const [expanded, setExpanded] = useState(false);

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
            <IconDetailHeart className="hover:fill-primary" />
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
          <GoodsCalendar />
        </div>
      </div>
      <div className="px-6">
        <div className="border border-1 border-gray-400 rounded-lg mt-[34px] py-[12px] px-[14px] flex justify-between text-gray-400">
          Minimum class size : 4 participants
        </div>
        <div className="mt-[22px] relative">
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
          <select className="outline-none appearance-none border border-gray-400 rounded-lg px-4 py-[12px] w-full text-gray-400 relative">
            <option>class type</option>
            <option>class type</option>
            <option>class type</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <IconOptionArw />
          </div>
        </div>
      </div>
      <ClassDetailCalendarSlide />
      <div>
        <ul
          className={tw(
            'flex items-center w-full justify-around mt-[30px] py-3',
            'border-t border-t-1 border-black border-b border-b-1 border-b-gray-300',
          )}
        >
          <li className="flex-1">
            <Link
              to=""
              className="flex items-center justify-center w-full h-full"
            >
              Details
            </Link>
          </li>
          <li className="flex-1">
            <Link
              to=""
              className="flex items-center justify-center w-full h-full"
            >
              Review(999+)
            </Link>
          </li>
          <li className="flex-1">
            <Link
              to=""
              className="flex items-center justify-center w-full h-full"
            >
              Q&A
            </Link>
          </li>
          <li className="flex-1">
            <Link
              to=""
              className="flex items-center justify-center w-full h-full"
            >
              Res. & Policies
            </Link>
          </li>
        </ul>
      </div>
      <ClassDetailOption />

      <div className="mt-[100px] mb-10">
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

      <div className="mt-10 pt-10 border-t border-t-1 border-t-gray-300">
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
      <div className="mt-10 pt-10 border-t border-t-1 border-t-gray-300">
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
    </div>
  );
};

export default ClassDetail;
