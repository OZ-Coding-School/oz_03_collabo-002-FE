import { Link } from 'react-router-dom';
import { Class } from '../../type/class';

type ClassCardProps = {
  classItem: Class;
  tag?: string | null;
};

const ClassCard = ({ classItem, tag }: ClassCardProps) => {
  console.log(classItem);

  const averageScore = classItem.average_rating || 0;
  const discountPrice = classItem.price_in_usd || classItem.price || 0;
  const originalPrice = classItem.price || 0;

  return (
    <div className="w-[42.5vw] max-w-[206px] relative">
      <Link to="" className="absolute inset-0"></Link>
      {/* image */}
      <div className="w-full rounded-sm mb-4">
        <img
          src={
            classItem.images && classItem.images.length > 0
              ? classItem.images[0].image_url
              : 'https://placehold.co/480x480@2x.png?text=gallary&font=Lato'
          }
          alt={classItem.description || 'Default description'}
        />
      </div>
      {/* content */}
      <div className="w-full">
        <div className="text-gray text-sm">
          {classItem.address
            ? `${classItem.address.state} > ${classItem.address.city}`
            : 'Location'}
        </div>
        <h2 className="w-full text-black font-bold text-lg line-clamp-2">
          {classItem.title}
        </h2>
        <div>
          <span>⭐️</span>
          <span>{` ` + averageScore}</span>
        </div>
        <span className="text-red text-2xl font-extrabold mr-1">
          0% {/* discountRate가 없는 경우 0%로 설정 */}
        </span>
        <span className="text-black font-extrabold text-2xl">
          {Math.ceil(discountPrice).toFixed(0)}
        </span>
        <span className="font-extrabold">$</span>
        <span className="text-gray line-through">
          {Math.ceil(originalPrice).toFixed(0) + `$`}
        </span>
        <div>
          {tag ? (
            <button className="bg-gray/50 text-sm px-3 py-1 rounded-full">
              {'#' + tag}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
