import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, User } from '../type/user';

const localStorageWrapper = {
  getItem: (name: string) => {
    const storedValue = localStorage.getItem(name);
    // JSON 문자열을 파싱하여 상태로 변환합니다.
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (name: string, value: unknown) => {
    // 상태를 JSON 문자열로 변환하여 저장합니다.
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
      updateProfileImage: (imageUrl: string) =>
        set((state) => ({
          user: state.user ? { ...state.user, profile_image: imageUrl } : null,
        })),
    }),
    {
      name: 'userInfo', // 로컬 스토리지에 저장될 키
      storage: localStorageWrapper, // 래핑된 스토리지를 사용
    },
  ),
);
