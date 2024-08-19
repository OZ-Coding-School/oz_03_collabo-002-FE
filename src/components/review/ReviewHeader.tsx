// import emptyStar from '../../icon/empty-star.svg';
import fullStar from '../../assets/icon/full-star.svg';

const ReviewHeader = () => {
  const stars: number[] = [1, 2, 3, 4, 5];
  return (
    <div>
      <hr className="border border-t-gray-200" />
      <div className="mx-1 my-4">
        <div className="flex w-full items-center gap-2">
          <p className="flex ">
            {stars.map((star) => (
              <img
                src={fullStar}
                alt={`${star} 점`}
                className="w-4 h-4 mx-[2px]"
              />
            ))}
          </p>
          <p className="font-bold">4.9</p>
          <p className="text-primary text-xs">320 reviews</p>
        </div>
        <div className="text-xs">
          It's a workshop that <span className="text-red">97%</span> of the
          experienced people are satisfied with!
        </div>
      </div>
      <hr className="border border-t-gray-200" />
    </div>
  );
};

export default ReviewHeader;
