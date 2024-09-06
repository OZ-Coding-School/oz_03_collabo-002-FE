import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserState } from '../type/user';

// const localStorageWrapper = {
//   getItem: (name: string) => {
//     const storedValue = localStorage.getItem(name);
//     return storedValue ? JSON.parse(storedValue) : null;
//   },
//   setItem: (name: string, value: unknown) => {
//     localStorage.setItem(name, JSON.stringify(value));
//   },
//   removeItem: (name: string) => {
//     localStorage.removeItem(name);
//   },
// };

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => {
        set({ user });
        console.log(user);
      },
      clearUser: () => set({ user: null }),

      updateProfileImage: (imageUrl) =>
        set((state) => ({
          user: state.user ? { ...state.user, profile_image: imageUrl } : null,
        })),
    }),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
