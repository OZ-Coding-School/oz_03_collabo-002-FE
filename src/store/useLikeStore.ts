import { create } from 'zustand';

interface LikeState {
  // // class?
  // likedClasess: Class[]
  likedClasses: string[]; // 좋아요한 클래스의 ID 목록
  toggleLike: (classId: string) => void;
  isLiked: (classId: string) => boolean;
}

const useLikeStore = create<LikeState>((set, get) => ({
  likedClasses: [],
  toggleLike: (classId) => {
    set((state) => {
      const isLiked = state.likedClasses.includes(classId);
      return {
        likedClasses: isLiked
          ? state.likedClasses.filter((id) => id !== classId)
          : [...state.likedClasses, classId],
      };
    });
  },
  isLiked: (classId) => get().likedClasses.includes(classId),
}));

export default useLikeStore;
