import GoodsDetailSlide from '../components/common/GoodsDetailSlide';
import GoodsDetailInfoSlide from '../components/common/GoodsDetailInfoSlide';
import { IconDetailHeart, IconReviewStar } from '../config/IconData';
import { twMerge as tw } from 'tailwind-merge';
import GoodsCalendar from '../components/common/GoodsCalendar';

const GoodsDetail = () => {
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
          <div className="mt-4 text-2xl flex">
            <p className="text-primary">
              <strong>{originalPrice.toLocaleString()}원</strong>
            </p>
            <p className="text-gray-400 line-through ml-2">
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
        <div className="mt-10">
          <div className="px-6">
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
      </div>
      <div>
        <GoodsCalendar />
      </div>
    </div>
  );
};

export default GoodsDetail;
