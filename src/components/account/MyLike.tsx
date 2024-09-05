import { useEffect, useState } from 'react';
import useLikeStore from '../../store/useLikeStore';
import ClassCard from '../common/ClassCard';
import { Class } from '../../type/class.type';
import { motion } from 'framer-motion';

const MyLike = () => {
  const likedClasses = useLikeStore((state) => state.likedClasses);
  const getLikedClasses = useLikeStore((state) => state.getLikedClasses);
  const [filteredClasses, setFilteredClasses] = useState<Class[] | null>(null);

  useEffect(() => {
    const fetchLikedClasses = async () => {
      const results = await getLikedClasses(likedClasses);
      if (results) {
        setFilteredClasses(results);
      }
    };

    fetchLikedClasses();
    console.log(likedClasses);
  }, [likedClasses, getLikedClasses]);

  if (!filteredClasses) return <div>찜한 클래스가 없습니다.</div>;

  return (
    <div>
      {filteredClasses.length !== 0 ? (
        filteredClasses.map((classItem) => (
          <div className="grid grid-cols-2 px-6 gap-[15px]">
            <ClassCard key={classItem.id} classItem={classItem} />
          </div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeOut", duration: 1 }}
          className="inline-flex w-full aspect-square text-gray-500"
        >
          <span className="m-auto w-5/6 text-gray text-xl text-center">
            {`Add your favorite classes :)`}
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default MyLike;
