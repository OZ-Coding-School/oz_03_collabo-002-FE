import { useEffect } from 'react';
import ClassCard from '../common/ClassCard';
import { useClassStore } from '../../store/useClassStore';

const PopularClasses: React.FC = () => {
  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  useEffect(() => {
    // fetchClasses 함수가 호출되는지 확인
    console.log('Fetching classes...');
    fetchClasses();
  }, [fetchClasses]);

  // classes 상태가 어떻게 생겼는지 확인
  console.log('Classes:', classes);

  if (!classes || classes.length === 0) {
    return <div>Loading...</div>;
  }

  const popularClasses = classes
    ?.filter((classItem) => classItem.is_viewed === true)
    .slice(0, 2);

  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>Popular Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {popularClasses && popularClasses.length > 0 ? (
          popularClasses.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))
        ) : (
          <div>no data</div>
        )}
      </div>
    </div>
  );
};

export default PopularClasses;
