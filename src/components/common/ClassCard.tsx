import { Class } from '../../store/useClassStore';

type ClassCardProps = {
  classItem: Class;
  tag?: string | null;
};

const ClassCard = ({ classItem, tag }: ClassCardProps) => {
  console.log(classItem);

  return (
    <div className="w-[42.5vw] max-w-[210px]">
      {/* image */}
      <div className="w-full rounded-sm mb-4">
        <img src={classItem.photoGallery[0]} alt={classItem.description} />
      </div>
      {/* content */}
      <div className="w-full">
        <div className="text-gray text-sm">
          {classItem.place.state + ` > ` + classItem.place.city}
        </div>
        <h2 className="w-full text-black font-bold text-lg line-clamp-2">
          {classItem.name}
        </h2>
        <div>
          <span>⭐️</span>
          <span>{` ` + classItem.averageScore}</span>
        </div>
        <span className="text-red text-2xl font-extrabold mr-1">
          {classItem.discountRate + `%`}
        </span>
        <span className="text-black font-extrabold text-2xl">
          {Math.ceil(classItem.discountPrice).toFixed(0)}
          {/* {Math.ceil(classItem.price).toFixed(2)} */}
        </span>
        <span className="font-extrabold">$</span>
        <span className="text-gray line-through">
          {Math.ceil(classItem.price).toFixed(0) + `$`}
        </span>{' '}
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
