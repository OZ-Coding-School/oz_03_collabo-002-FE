import { useEffect } from 'react';
import ClassCard from '../common/ClassCard';
import useClassStore from '../../store/useClassStore';

const PopularClasses = () => {
  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const popularClasses = classes
    ?.filter((classItem) => classItem.popular === true)
    .slice(0, 2); // 나중에 수정

  console.log(popularClasses);
  if (!classes) return <div>loading</div>;

  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>Popular Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {popularClasses &&
          popularClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              tag={classItem.tag}
            />
          ))}
      </div>
    </div>
  );
};

export default PopularClasses;
