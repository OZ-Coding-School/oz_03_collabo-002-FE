import { useEffect } from 'react';
import useLikeStore from '../../store/useLikeStore';
import ClassCard from '../common/ClassCard';
import { Class } from '../../type/class.type';
import { motion } from 'framer-motion';
import { useClassStore } from '../../store/useClassStore';
import EmptyData from '../common/EmptyData';

const MyLike = () => {
  const likedClasses = useLikeStore((state) => state.likedClasses);
  const getLikedClasses = useLikeStore((state) => state.getLikedClasses);
  const classes = useClassStore((state) => state.classes);

  useEffect(() => {
    getLikedClasses();
  }, [getLikedClasses]);

  // 좋아요한 클래스의 ID에 해당하는 Class 데이터를 찾아서 매칭
  const matchedClasses = likedClasses
    .map((classId) => classes.find((item: Class) => item.id === classId))
    .filter((classItem): classItem is Class => !!classItem); // classItem이 존재하는지 확인

    if (!likedClasses || likedClasses.length === 0) {
      return <EmptyData message="Add your favorite classes :)" />;
    }
  
  return (
    <div>
      {matchedClasses.length !== 0 ? (
        matchedClasses.map((classData) => (
          <div className="grid grid-cols-2 px-6 gap-[15px]">
            <ClassCard key={classData.id} classItem={classData} />
          </div>
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeOut', duration: 1 }}
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
