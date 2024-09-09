import { useEffect, useState } from 'react';
import { Class } from '../../type/class.type';
import { useClassStore } from '../../store/useClassStore';
import { IconReviewStar, IconReviewStarEmpty } from '../../config/IconData';

type RatingAverageProps = {
  id: string | undefined;
};

const RatingAverage = ({ id }: RatingAverageProps) => {
  const [thisClass, setThisClass] = useState<Class | null>(null);
  const findOneClass = useClassStore((state) => state.findOneClass);

  useEffect(() => {
    const fetchData = async () => {
      const classData = await findOneClass(id ?? '');
      setThisClass(classData);
    };
    fetchData();
  }, [id, findOneClass]);

  useEffect(() => {
    console.log('thisClass: ', thisClass);
  }, [id, thisClass]);

  if (!thisClass) return <div>Loading...</div>;

  const average_rate = Math.round(thisClass.average_rating);

  if (average_rate > 5 || average_rate < 0) {
    return (
      <div className="text-center py-[15px] text-red font-bold">
        Error: The input data contains an error.
      </div>
    );
  }

  return (
    <div className="py-[15px]">
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
