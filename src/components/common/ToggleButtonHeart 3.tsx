import useLikeStore from '../../store/useLikeStore';
import { IconOptionHeart } from '../../config/IconData';
import { useUserStore } from '../../store/useUser';
import { useModalStore } from '../../store/useModal';
import { useNavigate } from 'react-router-dom';

type ToggleButtonHeartProps = {
  classId: string;
};

const ToggleButtonHeart = ({ classId }: ToggleButtonHeartProps) => {
  const user = useUserStore((state) => state.user);
  const { toggleLike, isLiked } = useLikeStore();
  const liked = isLiked(classId);
  const {setModal} = useModalStore()
  const navigate = useNavigate()

  const toggleLikeClass = (classId: string) => {
    if (!user) {
      setModal('This is a member-only service.');

      // 일정 시간 후에 로그인 페이지로 이동
      setTimeout(() => {
        navigate('/login/');
      }, 1000);
    } else {
      toggleLike(classId);
    }
  };

  return (
    <button
      name="likeBtn"
      onClick={(e) => {
        e.stopPropagation();
        toggleLikeClass(classId);
      }}
      className="absolute right-1 top-2"
    >
      <IconOptionHeart
        className={`${liked ? 'fill-primary ' : 'fill-white '}`}
      />
      <span className="sr-only">heart</span>
    </button>
  );
};

export default ToggleButtonHeart;
