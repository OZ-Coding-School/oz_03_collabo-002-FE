import useLikeStore from '../../store/useLikeStore';
import { IconOptionHeart } from '../../config/IconData';
import { useUserStore } from '../../store/useUser';
import { useModalOpenCloseStore } from '../../store/useModal'; // Use the consistent store
import { useNavigate } from 'react-router-dom';

type ToggleButtonHeartProps = {
  classId: string;
};

const ToggleButtonHeart = ({ classId }: ToggleButtonHeartProps) => {
  const user = useUserStore((state) => state.user);
  const { toggleLike, isLiked } = useLikeStore();
  const liked = isLiked(classId);
  const { setModal } = useModalOpenCloseStore(); // Use the modal store correctly
  const navigate = useNavigate();

  const toggleLikeClass = (classId: string) => {
    if (!user) {
      setModal('This is a member-only service.');

      // Navigate to the login page after showing modal
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
      <IconOptionHeart className={`${liked ? 'fill-primary' : 'fill-white'}`} />
      <span className="sr-only">heart</span>
    </button>
  );
};

export default ToggleButtonHeart;
