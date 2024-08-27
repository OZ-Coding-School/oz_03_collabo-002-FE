import { useEffect } from 'react';
import ClassCard from '../common/ClassCard';
import useClassStore from '../../store/useClassStore';

const PopularClasses: React.FC = () => {
  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  useEffect(() => {
    console.log('useEffect triggered: Fetching classes');
    fetchClasses();
  }, [fetchClasses]);

  if (!classes || classes.length === 0) {
    return <div>Loading...</div>;
  }

  console.log(classes, 'classes');
  const popularClasses = classes
    ?.filter((classItem) => classItem.is_viewed === true)
    .slice(0, 2);

  console.log(popularClasses, 'pop');

  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>Popular Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {popularClasses && popularClasses.length > 0 ? (
          popularClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              tag={classItem.tag}
            />
          ))
        ) : (
          <div>no data</div>
        )}
      </div>
    </div>
  );
};

export default PopularClasses;
