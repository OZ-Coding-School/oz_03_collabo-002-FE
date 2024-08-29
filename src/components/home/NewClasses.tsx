import { useEffect } from 'react';
import ClassCard from '../common/ClassCard';
import useClassStore from '../../store/useClassStore';
import classList from '../../mocks/data/classList.json';
import { ClassState } from '../../type/class';

const NewClasses = () => {
  const classes = useClassStore((state) => state.classes);
  const setClasses = useClassStore((state: ClassState) => state.setClasses);

  useEffect(() => {
    setClasses(classList);
    console.log(classList, 'classList');
  }, [setClasses]);

  if (!classes || classes.length === 0) {
    return <div>Loading...</div>;
  }

  //console.log(classes, 'classes');

  // is_new 속성을 필터링하고 두 개만 선택
  const newClasses = classes
    ?.filter((classItem) => classItem.is_new === true)
    .slice(0, 2);

  if (!newClasses || newClasses.length === 0) {
    return <div>Loading...</div>;
  }
  //console.log(newClasses, 'new');

  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>New Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {newClasses && newClasses.length > 0 ? (
          newClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              tag={classItem.tag}
            />
          ))
        ) : (
          <div>no data </div>
        )}
      </div>
    </div>
  );
};

export default NewClasses;
