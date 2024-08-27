import { useEffect } from 'react';
import ClassCard from '../common/ClassCard';
import useClassStore from '../../store/useClassStore';
import classList from '../../mocks/data/classList.json'; // 로컬 JSON 파일 가져오기
import { ClassState } from '../../type/class';

const KpickClasses = () => {
  const setClasses = useClassStore((state: ClassState) => state.setClasses);

  useEffect(() => {
    setClasses(classList);
  }, [setClasses]);

  const classes = useClassStore((state) => state.classes);

  // is_new 속성을 필터링하고 두 개만 선택
  const KpickClasses = classes
    ?.filter((classItem) => classItem.is_new === true)
    .slice(0, 2);

  console.log(KpickClasses, 'kpick');

  if (!classes) return <div>loading</div>;

  return (
    <div className="px-6">
      <h3 className="text-[20px] mb-5">
        <strong>New Classes</strong>
      </h3>
      <div className="grid grid-cols-2 gap-[15px]">
        {KpickClasses &&
          KpickClasses.map((classItem) => (
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

export default KpickClasses;
