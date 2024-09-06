import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserState } from '../type/user';

export const useUserStore = create(
  persist<UserState>(
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
