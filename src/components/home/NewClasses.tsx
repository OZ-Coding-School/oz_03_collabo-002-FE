import { useEffect } from 'react';
import ClassCard from '../common/ClassCard';
import useClassStore from '../../store/useClassStore';
import classList from '../../mocks/data/classList.json'; // 로컬 JSON 파일 가져오기
import { ClassState } from '../../type/class';

const NewClasses = () => {
  const setClasses = useClassStore((state: ClassState) => state.setClasses);

  useEffect(() => {
    setClasses(classList);
  }, [setClasses]);

  const classes = useClassStore((state) => state.classes);

  // is_new 속성을 필터링하고 두 개만 선택
  const newClasses = classes
    ?.filter((classItem) => classItem.is_new === true)
    .slice(0, 2);

  console.log(newClasses, 'new');

  if (!classes) return <div>loading</div>;

  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>New Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {newClasses &&
          newClasses.map((classItem) => (
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

export default NewClasses;
