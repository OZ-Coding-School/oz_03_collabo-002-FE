import { create } from 'zustand';

type LikeState = {
  likedClasses: string[]; // 좋아요한 클래스의 ID 목록
  toggleLike: (classId: string) => void;
  isLiked: (classId: string) => boolean;
}

const useLikeStore = create<LikeState>((set, get) => ({
  likedClasses: [],
  toggleLike: (classId: string) => {

    const {likedClasses} = get()
    if (likedClasses.includes(classId)) {
      set({ likedClasses: likedClasses.filter(id => id !== classId) });
    } else {
      set({ likedClasses: [...likedClasses, classId] });
    }
  
  },
  isLiked: (classId) => get().likedClasses.includes(classId),
}));

export default useLikeStore;
