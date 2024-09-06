import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AccountActions, AccountState } from '../type/account.type';
import axios from '../api/axios';
import { useModalStore } from './useModal';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useUserStore } from './useUser';

const useAccountStore = create<AccountState & AccountActions>()(
  persist(
    immer((set, get) => ({
      myOrders: [],

      regenerateToken: async () => {
        try {
          const response = await axios.post(
            '/users/token/refresh/',
            {},
            { withCredentials: true },
          );
          const { accessToken } = response.data;
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            console.log('Token refreshed successfully');
          } else {
            console.log('Token refresh failed: no accessToken returned');
          }
        } catch (error) {
          console.error('Failed to refresh token: ', error);
          // Optionally, you might want to clear the user session if token refresh fails
          localStorage.removeItem('userInfo');
          localStorage.removeItem('accessToken');
          useUserStore.getState().setUser(null);
          useModalStore
            .getState()
            .setModal('Session expired, please log in again.');
        }
      },

      fetchMyOrder: () => {
        //
        set((state) => {
          state.myOrders = [];
        });
      } catch (error) {
        console.error('Failed to fetch orders', error);
      }
    },

    fetchUser: async () => {
      try {
        const response = await axios.get('/users/detail');
        set({ user: response.data });
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    },

    updateUser: async (
      updateData: Partial<{ name: string; avatar: File | string | null }>,
    ) => {
      const setModal = useModalStore.getState().setModal;
      const user = get().user;

      if (!user || !user.id) {
        console.error('User ID is missing or undefined');
        return;
      }

      // UpdateData에서 name과 avatar를 선택적으로 가져옵니다.
      const { name, avatar } = updateData;

      const dataToSend: { name?: string; avatar?: File | string | null } = {};

      if (name) {
        dataToSend.name = name;
      }

      if (avatar) {
        dataToSend.avatar = avatar;
      }

      try {
        //const response = await axios.patch('/users/detail', dataToSend);
        setModal('Success to update');
        get().fetchUser();
      } catch (error) {
        setModal('Failed to update');
        console.error('Failed to update', error);
      }
    },

    deleteUser: async () => {
      const setModal = useModalStore.getState().setModal;

      try {
        // const response = await axios.delete('/users/detail');
        set({ user: null });
        setModal('Success to delete account');
      } catch (error) {
        console.error('Failed delete user: ', error);
        setModal('Failed to delete account');
      }

    },
  ),
);

export default useAccountStore;
