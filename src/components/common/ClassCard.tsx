import { useNavigate } from 'react-router-dom';
import { IconOptionHeart, IconReviewStar } from '../../config/IconData';
import { Class } from '../../type/class.type';
import useLikeStore from '../../store/useLikeStore';

type ClassCardProps = {
  classItem: Class;
};

const ClassCard = ({ classItem }: ClassCardProps) => {
  const navigate = useNavigate();
  const tags: string[] = [];
  if (classItem.is_new) tags.push('new');
  if (classItem.is_best) tags.push('best');
  if (classItem.is_viewed) tags.push('viewed');

  // 타입 가드로 address 타입 확인
  const addressState = '';
  const addressCity = '';

  const imageUrl =
    classItem.images &&
    classItem.images[0] !== undefined &&
    classItem.images.length > 0 &&
    classItem.images[0].detail_image_urls.length > 0
      ? classItem.images[0]?.detail_image_urls[0]
      : '/images/img-sample.jpg';

  const averageScore = classItem.average_rating || 0;
  const priceInUsd = classItem.price_in_usd || 0;
  const discountInUsd = (priceInUsd * (100 - classItem.discount_rate)) / 100;

  const { toggleLike, isLiked } = useLikeStore();
  const liked = isLiked(classItem.id);

  return (
    <div className="w-[42.5vw] max-w-[206px] relative">
      <div className="absolute inset-0 pointer-events-none"></div>
      {/* image */}
      <div className="relative w-full aspect-square rounded-sm mb-4">
        <img
          src={imageUrl}
          alt={classItem.description}
          className="w-full aspect-square object-cover object-left-top"
        />
        <button
          name="likeBtn"
          onClick={() => toggleLike(classItem.id)}
          className="absolute right-1 top-2"
        >
          <IconOptionHeart
            className={`${liked ? 'fill-primary ' : 'fill-white '}`}
          />
          <span className="sr-only">heart</span>
        </button>
      </div>
      {/* content */}
      <div className="w-full">
        {/* location */}
        <div className="text-gray text-sm mb-2">
          {addressState && addressCity
            ? `${addressState} > ${addressCity}`
            : ''}
        </div>
        <h2
          className="w-full text-black font-bold text-lg line-clamp-2 cursor-pointer"
          onClick={() => navigate(`/class/${classItem.id}`)}
        >
          {classItem.title}
        </h2>
        {/* price */}
        {classItem.discount_rate !== 0 ? (
          <div className="mb-2">
            <span className="text-black font-extrabold text-2xl">
              {Math.ceil(discountInUsd).toFixed(0)}
              <span className="font-extrabold text-base">$</span>
            </span>
            <span className="text-gray line-through mr-2">
              {Math.ceil(priceInUsd).toFixed(0) + `$`}
            </span>
            <span className="text-red text-2xl font-extrabold mr-2 rounded-md">
              {classItem.discount_rate}%
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
        {/* average rating */}
        <div className="flex items-center mb-2">
          <IconReviewStar className="mr-2" />
          <span>{averageScore.toFixed(1)}</span>
        </div>
        {/* tag - new, best */}
        <div>
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <button
                key={index}
                value={'#' + tag}
                className="bg-gray/40 text-sm px-2 py-1/2 rounded-full mr-2"
              >
                #{tag}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
