import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState, User } from '../type/user';

export const useUserStore = create(
  persist<UserState>(
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
      name: 'userInfo',
      // serialize: (state) => JSON.stringify(state.state?.user),
    },
  ),
);
