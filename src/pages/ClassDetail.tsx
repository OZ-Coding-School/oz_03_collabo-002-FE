import GoodsDetailSlide from '../components/classDetail/ClassDetailSlide';
import GoodsDetailInfoSlide from '../components/classDetail/ClassDetailInfoSlide';
import { IconDetailHeart, IconReviewStar } from '../config/IconData';
import { twMerge as tw } from 'tailwind-merge';
import GoodsCalendar from '../components/classDetail/ClassCalendar';
import ClassDetailCalendarSlide from '../components/classDetail/ClassDetailCalendarSlide';

const ClassDetail = () => {
  const originalPrice = 14900;
  const discountedPrice = 12900;

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
            &nbsp;4.5<span className="text-gray-400">(00개)</span>
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
        <div className="border border-1 border-gray-400 rounded-lg mt-[34px] py-[12px] px-[14px] flex justify-between">
          4명이 모이면 시작되요
          <span>3/15</span>
        </div>
      </div>
      <ClassDetailCalendarSlide />
    </div>
  );
};

export default ClassDetail;
