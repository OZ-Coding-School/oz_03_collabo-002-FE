import { useEffect } from 'react';
import ClassCard from '../common/ClassCard';
import useClassStore from '../../store/useClassStore';

const KpickClasses = () => {
  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  if (!classes || classes.length === 0) {
    return <div>Loading...</div>;
  }

  const KpickClasses = classes
    ?.filter((classItem) => classItem.is_best === true)
    .slice(0, 2);

  console.log(KpickClasses, 'kpick');

  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>K-pick Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {KpickClasses && KpickClasses.length > 0 ? (
          KpickClasses.map((classItem) => (
            <ClassCard key={classItem.id} classItem={classItem} />
          ))
        ) : (
          <div>no data</div>
        )}
      </div>
    </div>
  );
};

export default KpickClasses;
