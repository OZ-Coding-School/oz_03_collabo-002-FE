import { useEffect, useState } from 'react';
import useLikeStore from '../../store/useLikeStore';
import ClassCard from '../common/ClassCard';
import { Class } from '../../type/class.type';

const MyLike = () => {
  const likedClasses = useLikeStore((state) => state.likedClasses);
  const getLikedClasses = useLikeStore((state) => state.getLikedClasses);
  const [filteredClasses, setFilteredClasses] = useState<Class[] | []>([]);

  useEffect(() => {
    const fetchLikedClasses = async () => {
      const results = await getLikedClasses(likedClasses);
      if (results) {
        setFilteredClasses(results);
      }
    };

    fetchLikedClasses();
  }, [likedClasses, getLikedClasses]);

  if (filteredClasses.length === 0) return <div>찜한 클래스가 없습니다.</div>;

  return (
    <div>
      {filteredClasses.map((classItem) => (
        <ClassCard key={classItem.id} classItem={classItem} />
      ))}
    </div>
  );
};

export default MyLike;
