import { IconReviewStar } from '../../config/IconData';
import { Class } from '../../type/class.type';

const GoodsDetailTopInfo = ({
  classItemState,
  rating,
  originalPrice,
  discountRate,
  discountedPrice,
}: {
  classItemState: Class | null;
  rating: number;
  originalPrice: number;
  discountRate: number;
  discountedPrice: number;
}) => {
  if (!classItemState) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <div className="px-6">
        <p className="text-[13px] text-gray-400 font-bold pt-[14px]">
          {Array.isArray(classItemState.category) &&
          classItemState.category.length > 0
            ? classItemState.category.join(', ')
            : classItemState.category || ''}
        </p>
        <strong className="text-[32px] font-normal">
          {classItemState.title || ''}
        </strong>
        <p className="flex items-center">
          <IconReviewStar />
          &nbsp;{rating}
        </p>
        <div className="mt-4 text-2xl flex items-center">
          {originalPrice > 0 ? (
            <>
              {discountRate > 0 && (
                <p className="text-[#D91010] text-[20px] font-bold mr-2">
                  {discountRate}%
                </p>
              )}
              <p className="text-primary text-[24px]">
                <strong>{discountedPrice.toLocaleString()}원</strong>
              </p>
              {discountRate > 0 && (
                <p className="text-gray-400 line-through ml-2 text-base">
                  {originalPrice.toLocaleString()}원
                </p>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default GoodsDetailTopInfo;
