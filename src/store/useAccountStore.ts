import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AccountActions, AccountState } from '../type/account.type';
import axios from '../api/axios';
import { useModalOpenCloseStore } from './useModal';
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
          localStorage.removeItem('userInfo');
          localStorage.removeItem('accessToken');
          useUserStore.getState().setUser(null);
          useModalOpenCloseStore
            .getState()
            .setModal('Session expired, please log in again.');
        }
      },

      fetchMyOrder: () => {
        set((state) => {
          state.myOrders = [];
        });
      },

      getUserDetail: async () => {
        const accessToken = localStorage.getItem('accessToken');
        const setUser = useUserStore.getState().setUser;
        try {
          const response = await axios.get('/users/detail', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = response.data;
          console.log('getUserDetail: ', data);
          setUser(data);
          localStorage.setItem('userInfo', data);
        } catch (error) {
          console.log('Failed get User Detail: ', error);
        }
      },

      updateUser: async (
        updateData: Partial<{ name: string; avatar: File | string | null }>,
      ) => {
        const user = useUserStore.getState().user;
        const accessToken = localStorage.getItem('accessToken');
        const setModal = useModalOpenCloseStore.getState().setModal;

        if (!user || !user.id) {
          console.error('User ID is missing or undefined');
          return;
        }

        const { name, avatar } = updateData;

        const dataToSend: {
          name?: string;
          profile_image?: File | string | null;
        } = {};

        if (name) {
          dataToSend.name = name;
        }

        if (avatar) {
          dataToSend.profile_image = avatar;
        }

        try {
          const response = await axios.patch('/users/detail', dataToSend, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(response);
          get().getUserDetail();
          setModal('Success to update');
        } catch (error) {
          console.error('Failed to update', error);
          setModal('Failed to update');
        }
      },

      logout: async () => {
        const accessToken = localStorage.getItem('accessToken');
        const setModal = useModalOpenCloseStore.getState().setModal;
        const setUser = useUserStore.getState().setUser;

        try {
          const response = await axios.post('/users/logout', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(response);
          setModal('Success to logout');
          setUser(null); // clearUser 함수 대신 사용
          localStorage.removeItem('userInfo');
          localStorage.removeItem('accessToken');
        } catch (error) {
          console.log('Failed to logout: ', error);
        }
      },

      deleteUser: async () => {
        const accessToken = localStorage.getItem('accessToken');
        const setUser = useUserStore.getState().setUser;
        const setModal = useModalOpenCloseStore.getState().setModal;

        try {
          const response = await axios.delete('/users/detail', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          console.log(response);
          setUser(null);
          localStorage.removeItem('userInfo');
          setModal('Success to delete account');
        } catch (error) {
          console.error('Failed delete user: ', error);
          setModal('Failed to delete account');
        }
      },
    })),
    {
      name: 'userInfo',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAccountStore;
