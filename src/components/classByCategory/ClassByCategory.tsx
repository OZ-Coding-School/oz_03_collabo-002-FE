import { useEffect } from 'react';
import useClassStore from '../../store/useClassStore';
import ClassCard from '../common/ClassCard';

const ClassByCategory = () => {
  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);
  const path = String(location.pathname.split('/').slice(-1)) || '';

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  if (!classes) return null;

  return (
    <div className="w-full px-6">
      <h1 className="font-extrabold text-xl my-6 text-center">
        Class &gt; {capitalize(path)}
      </h1>
      <div className="grid gap-x-[15px] gap-y-6 grid-cols-2">
        {classes &&
          classes.map((item) => (
            <ClassCard key={item.id} classItem={item} />
          ))}
      </div>
    </div>
  );
};

export default ClassByCategory;
