import { IconReviewStar } from '../../config/IconData';
import { Class } from '../../type/class.type';

type ClassCardProps = {
  classItem: Class;
  // tag?: string | null;
};

const ClassCard = ({ classItem }: ClassCardProps) => {
  const tags: string[] = [];
  if (classItem.is_new) {
    tags.push('new');
  }
  if (classItem.is_best) {
    tags.push('best');
  }
  if (classItem.is_viewed) {
    tags.push('viewed');
  }

  // const addressState = classItem.address.split(" ",1);
  const [addressState, addressCity] = classItem.address.split(' ', 2);

  return (
    <div className="w-[42.5vw] max-w-[206px]">
      {/* image */}
      <div className="w-full rounded-sm mb-4">
        <img src={classItem.images[0].image_url} alt={classItem.description} />
      </div>
      {/* content */}
      <div className="w-full">
        <div className="text-gray text-sm">
          {addressState + ` > ` + addressCity}
        </div>
        <h2 className="w-full text-black font-bold text-lg line-clamp-2">
          {classItem.title}
        </h2>
        <div>
          <span>
            <IconReviewStar />
          </span>
          <span>{` ` + classItem.averageScore}</span>
        </div>
        <span className="text-red text-2xl font-extrabold mr-1">
          0%
          {/* {classItem.discountRate + `%`} */}
        </span>
        <span className="text-black font-extrabold text-2xl">
          {Math.ceil(classItem.price_in_usd).toFixed(0)}
          {/* {Math.ceil(classItem.price).toFixed(2)} */}
        </span>
        <span className="font-extrabold">$</span>
        <span className="text-gray line-through">
          {Math.ceil(classItem.price_in_usd).toFixed(0) + `$`}
        </span>
        <div>
          {/* 태그가 있는 경우 모든 태그를 버튼으로 표시 */}
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <button
                key={index}
                value={'#' + tag}
                className="bg-gray/40 text-sm px-2 py-1/2 rounded-full mr-2"
               >#{tag}</button>
               
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
