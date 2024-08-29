import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import useClassStore from '../../store/useClassStore';
import ClassCard from '../common/ClassCard';
import { useLocation } from 'react-router-dom';
import { Class } from '../../type/class.type';
import CategoryHeader from './CategoryHeader';

const Category = () => {
  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);
  const location = useLocation();
  const path = String(location.pathname.split('/').slice(-1)) || '';

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  

  const filteredClasses = useMemo<Class[]>(() => {
    if (path === 'all') {
      return classes || [];
    }
    return classes?.filter((item) => item.category === path) || [];
  }, [classes, path]);

  if (!classes) return null;

  return (
    <div className="w-full px-6">
      <CategoryHeader path={path}/>
      {filteredClasses.length > 0 ? (
        <div className="grid gap-x-[15px] gap-y-6 grid-cols-2">
          {filteredClasses.map((item) => (
            <ClassCard key={item.id} classItem={item} />
          ))}
        </div>
      ) : (
        <div className="w-full aspect-square flex text-center">
          <motion.div
            animate={{ y: [-50, 0] }}
            transition={{ type: 'spring' }}
            className="m-auto text-2xl text-gray font-bold"
          >
            Coming Soon
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Category;