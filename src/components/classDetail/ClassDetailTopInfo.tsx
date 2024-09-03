import { twJoin as tw } from 'tailwind-merge';
import { IconDetailShare, IconReviewStar } from '../../config/IconData'
import { Class } from '../../type/class.type'
import { useState } from 'react';
import GoodsDetailInfoSlide from './ClassDetailInfoSlide';

type Props = {
  classData: Class
}

const ClassDetailTopInfo = ({classData}: Props) => {
  const [isLiked, setIsLiked] = useState(false);

    // 할인율 discountRate 대입하여 할인가 계산
    let discountPrice; // 할인가
    if (classData) {
      discountPrice = Math.ceil(
        classData.price_in_usd * (1 - classData.discount_rate / 100),
      );
    }

    const toggleLike = () => {
      setIsLiked((prevIsLiked) => !prevIsLiked);
    };

  return (
<>
              {/* 클래스 정보 */}
              <div className="relative px-6">
                <p className="text-sm text-gray py-[15px]">
              {`Class > `}{classData.genre || 'No category'}
                </p>
                <p className="text-2xl pr-9 font-bold">{classData.title}</p>
                <p className="flex items-center">
                  <IconReviewStar />
                  &nbsp;
                  {/* {classData.averageScore} */}
                  <span>{classData.average_rating}</span>
                  <span className="text-gray-400">(00개)</span>
                </p>
                <div className="mt-4 text-2xl flex items-center">
                  <p className="text-red text-2xl font-extrabold mr-2">
                    {classData.discount_rate} %
                  </p>
                  <p className="text-primary text-2xl  font-bold mr-2">
                    ${discountPrice}
                    {/* <strong>{originalPrice.toLocaleString()}원</strong> */}
                  </p>
                  <p className="text-gray-400 line-through text-base">
                    ${classData.price_in_usd}
                    {/* {discountedPrice.toLocaleString()}원 */}
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
              {/* 완성작 정보 */}
              <div className="mt-[15px] px-6">
                <h3 className="text-lg">Details of the Workshop Piece</h3>
                {classData?.description
                  .split('\n')
                  .map((item) => <p className="text-[13px] mt-1">- {item}</p>)}
              </div>
              <GoodsDetailInfoSlide
                scrollImage={classData.images[0]?.description_image_urls || []}
              /></>  )
}

export default ClassDetailTopInfo