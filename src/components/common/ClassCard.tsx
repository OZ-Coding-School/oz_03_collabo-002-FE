import { Link } from 'react-router-dom';
import { IconReviewStar } from '../../config/IconData';
import { Class } from '../../type/class.type';

type ClassCardProps = {
  classItem: Class;
};

const ClassCard = ({ classItem }: ClassCardProps) => {
  const tags: string[] = [];
  if (classItem.is_new) tags.push('new');
  if (classItem.is_best) tags.push('best');
  if (classItem.is_viewed) tags.push('viewed');

  const [addressState, addressCity] =
    typeof classItem.address === 'string'
      ? classItem.address.split(' ', 2)
      : ['', ''];

  const imageUrl =
    classItem.images && classItem.images.length > 0
      ? classItem.images[0].image_url
      : './public/images/img-sample.jpg';

  const averageScore = classItem.averageScore || 0;
  const priceInUsd = classItem.price_in_usd || 0;
  const originalPrice = classItem.price || 0;

  return (
    <div className="w-[42.5vw] max-w-[206px] relative">
      <Link to="" className="absolute inset-0"></Link>
      {/* image */}
      <div className="w-full rounded-sm mb-4">
        <img src={imageUrl} alt={classItem.description} />
      </div>
      {/* content */}
      <div className="w-full">
        <div className="text-gray text-sm">
          {addressState && addressCity
            ? `${addressState} > ${addressCity}`
            : 'Address not available'}
        </div>
        <h2 className="w-full text-black font-bold text-lg line-clamp-2">
          {classItem.title}
        </h2>
        <div>
          <span>
            <IconReviewStar />
          </span>
          <span>{` ` + averageScore}</span>
        </div>
        <span className="text-red text-2xl font-extrabold mr-1">
          {/* 여기에 할인율이 있다면 표시 */}
          0%
        </span>
        <span className="text-black font-extrabold text-2xl">
          {Math.ceil(priceInUsd).toFixed(0)}
        </span>
        <span className="font-extrabold">$</span>
        <span className="text-gray line-through">
          {Math.ceil(priceInUsd).toFixed(0) + `$`}
        </span>
        <div>
          {/* 태그가 있는 경우 모든 태그를 버튼으로 표시 */}
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
