import useClassStore from '../../store/useClassStore';
import useLikeStore from '../../store/useLikeStore';
import ClassCard from '../common/ClassCard';

type Props = {};

const MyLike = (props: Props) => {
  const likedClasses = useLikeStore((state) => state.likedClasses);
  const classes = useClassStore(state => state.classes)

  return (
    <div>
      {likedClasses.map((classId) => (
        <ClassCard key={classId} classItem={{ classData }} />
      ))}
    </div>
  );
};

export default MyLike;
