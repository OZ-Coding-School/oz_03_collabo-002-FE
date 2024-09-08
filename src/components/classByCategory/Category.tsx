import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useClassStore } from '../../store/useClassStore';
import ClassCard from '../common/ClassCard';
import { useLocation } from 'react-router-dom';
import { Class } from '../../type/class.type';
import CategoryHeader from './CategoryHeader';

const Category = () => {
  const classes = useClassStore((state) => state.classes);
  const fetchClasses = useClassStore((state) => state.fetchClasses);
  const location = useLocation();
  const path = String(location.pathname.split('/').slice(-1)) || '';
  console.log(path);
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  useEffect(() => {
    switch (path) {
      case 'cooking':
        setCategory('Cooking');
        break;
      case 'art-culture':
        setCategory('Art & Culture');
        break;
      case 'test2':
        setCategory('Test2');
        break;
      case 'beauty-fashion':
        setCategory('Beauty & Fashion');
        break;
      case 'diy':
        setCategory('DIY');
        break;
      case 'activities':
        setCategory('Activities');
        break;
      case 'test':
        setCategory('Test');
        break;
      default:
        setCategory('all');
        break;
    }
  }, [path]);

  const filteredClasses = useMemo<Class[]>(() => {
    if (category === 'all') {
      return classes || [];
    }
    return classes?.filter((item) => item.category === category) || [];
  }, [classes, category]);

  if (!classes) return null;

  return (
    <div className="w-full px-6">
      <CategoryHeader path={category} />
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
