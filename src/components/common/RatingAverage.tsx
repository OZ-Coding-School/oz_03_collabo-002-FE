// import emptyStar from '../../icon/empty-star.svg';
// import fullStar from '../../assets/icon/full-star.svg';
import { IconReviewStar, IconReviewStarEmpty } from '../../config/IconData';

const RatingAverage = () => {
  const average_rate = Math.round(4.2);

  return (
    <div className='py-[15px]'>
        <div className="text-center mb-4">
          <strong className="flex items-center justify-center text-[20px] font-semibold">
            <div className="flex mr-1">
              {[...Array(average_rate)].map((_, i) => (
                <IconReviewStar key={i} className="" />
              ))}
              {[...Array(5 - average_rate)].map((_, i) => (
                <IconReviewStarEmpty key={i} className="" />
              ))}
            </div>
            <span className="text-primary">320</span>&nbsp;reviews
          </strong>
          <p className="text-[14px] leading-[34px]">
            <strong className="text-primary">97%</strong> of participants are
            satisfied with the workshop!
          </p>
        </div>
    </div>
  );
};

export default RatingAverage;
