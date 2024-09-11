import { twJoin as tw } from 'tailwind-merge';
import { IconDetailShare, IconReviewStar } from '../../config/IconData';
import { Class } from '../../type/class.type';
import GoodsDetailInfoSlide from './ClassDetailInfoSlide';
import { Review } from '../../type/review.type';
import { Divider } from '@mantine/core';

type Props = {
  classData: Class;
  reviews: Review[] | null;
};

const ClassDetailTopInfo = ({ classData, reviews }: Props) => {
  // 할인율 discountRate 대입하여 할인가 계산
  const priceInUsd = classData.price_in_usd || 0;
  const discountInUsd = (priceInUsd * (100 - classData.discount_rate)) / 100;

  const handleShare = () => {
    // share 관련 함수 정의
  };

  console.log(classData.genre);
  if (!classData) return;

  return (
    <>
      {/* 클래스 정보 */}
      <div className="px-6">
        <p className="text-sm text-gray py-[15px]">
          {`Class > `}
          {classData.genre || 'No category'}
        </p>
        <div className="relative mb-[15px]">
          <p className="text-2xl pr-10 font-bold">{classData.title}</p>
          {/* Share */}
          <button
            className={tw(
              'w-9 h-9 border border-gray-400 rounded-full flex items-center justify-center',
              'absolute top-[15px] right-0',
            )}
            aria-label="공유하기"
            onClick={handleShare}
          >
            <IconDetailShare />
          </button>
        </div>
        {/* price */}
        {classData.discount_rate !== 0 ? (
          <div className="mb-2">
            <span className="text-black font-extrabold text-2xl">
              {Math.ceil(discountInUsd).toFixed(0)}
              <span className="font-extrabold text-base">$</span>
            </span>
            <span className="text-gray line-through mr-2">
              {Math.ceil(priceInUsd).toFixed(0) + `$`}
            </span>
            <span className="text-red text-2xl font-extrabold mr-2 rounded-md">
              {classData.discount_rate}%
            </span>
          </div>
        ) : (
          <div className="mb-2">
            <span className="text-black font-extrabold text-2xl">
              {Math.ceil(discountInUsd).toFixed(0)}
            </span>
            <span className="font-extrabold">$</span>
          </div>
        )}
        {/* Review info */}

        <p className="flex items-center">
          <IconReviewStar />
          &nbsp;
          {/* {classData.averageScore} */}
          {classData.average_rating === null ? (
            <div className="text-gray ml-3 underline">Please write review</div>
          ) : (
            <div>
              <span>{Number(classData.average_rating).toFixed(1)}</span>
              <span className="text-darkgray ml-3 underline">
                {reviews?.length}{' '}
                {reviews && reviews?.length < 2 ? 'Review' : 'Reviews'}
              </span>
            </div>
          )}
        </p>
      </div>
      {/* 완성작 정보 */}
      <div className="mt-[15px] px-6">
        <h3 className="text-lg">Details of the Workshop Piece</h3>
        {classData?.description
          .split('\n')
          .map((item) => <p className="text-[13px] mt-1">- {item}</p>)}
      </div>
      <GoodsDetailInfoSlide
        scrollImage={classData.images[0]?.description_image_urls || []}
      />
    </>
  );
};

export default ClassDetailTopInfo;
