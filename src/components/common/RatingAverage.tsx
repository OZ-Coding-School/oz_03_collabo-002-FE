import { useEffect, useState } from 'react';
import { Class } from '../../type/class.type';
import { useClassStore } from '../../store/useClassStore';
import { IconReviewStar, IconReviewStarEmpty } from '../../config/IconData';
import { AllReview } from '../../type/review.type';
import useReviewStore from '../../store/useReviewStore';
import axios from 'axios';

type RatingAverageProps = {
  id: string | undefined;
};

const RatingAverage = ({ id }: RatingAverageProps) => {
  const [thisClass, setThisClass] = useState<Class | null>(null);
  const [thisReview, setThisReview] = useState<AllReview | null>(null);
  const findOneClass = useClassStore((state) => state.findOneClass);
  const reviews = useReviewStore((state) => state.reviews);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          // Promise.all을 사용하여 두 개의 비동기 요청을 병렬로 처리
          const [allReviewData, classData] = await Promise.all([
            axios.get(`https://api.custom-k.store/v1/reviews/${id}`),
            findOneClass(id),
          ]);
          setThisReview(allReviewData.data);
          setThisClass(classData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [id, findOneClass, reviews]); // 의존성 배열에서 thisReview와 thisClass를 제거

  if (!thisClass || !thisReview) return <div>Loading...</div>;

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
          <span className="text-primary">{thisReview?.total_count}</span>
          &nbsp;reviews
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
