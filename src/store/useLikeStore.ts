import { create } from 'zustand';
import { Class } from '../type/class.type';
import useClassStore from './useClassStore';

type LikeState = {
  likedClasses: string[]; // 좋아요한 클래스의 ID 목록
  toggleLike: (classId: string) => void;
  isLiked: (classId: string) => boolean;
  getLikedClasses: (classIds: string[]) => Promise<Class[] | null>;
};

const useLikeStore = create<LikeState>((set, get) => ({
  likedClasses: [],
  toggleLike: (classId: string) => {
    const { likedClasses } = get();
    if (likedClasses.includes(classId)) {
      set({ likedClasses: likedClasses.filter((id) => id !== classId) });
    } else {
      set({ likedClasses: [...likedClasses, classId] });
    }
  },
  isLiked: (classId) => get().likedClasses.includes(classId),
  getLikedClasses: async (likedClassIds: string[]): Promise<Class[] | null> => {
    const findOneClass = useClassStore.getState().findOneClass;

    const promises = likedClassIds.map(async (classId) => {
      const classData = await findOneClass(classId);
      return classData;
    });

    const results = await Promise.all(promises);
    return results.filter((classData) => classData !== null) as Class[];
  },
}));

export default useLikeStore;
