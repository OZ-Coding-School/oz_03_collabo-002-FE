import { NavigateFunction } from 'react-router-dom';
import { Class } from './class.type';

export type LikeData = {
  total_count: number;
  total_pages: number;
  current_page: number;
  results: Class[];
};

type LikeState = {
  likedClasses: string[] ; // 좋아요한 클래스의 ID 목록
  toggleLike: (classId: string, navigate: NavigateFunction) => Promise<void>;
  isLiked: (classId: string) => boolean;
  getLikedClasses: () => Promise<void>;
};

export default LikeState;