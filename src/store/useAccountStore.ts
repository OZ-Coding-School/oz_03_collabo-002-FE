import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AccountActions, AccountState } from '../type/account.type';
import axios from '../api/axios';
import { useModalStore } from './useModal';
import { persist } from 'zustand/middleware';

const useAccountStore = create<AccountState & AccountActions>()(
  persist(
    immer((set, get) => ({
      user: null,
      access: null,
      refresh: null,
      myOrders: [],

      fetchMyOrder: async () => {
        const access = localStorage.getItem('accessToken');
        try {
          const response = await axios.get('/history', {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });

          set((state) => {
            state.myOrders = response.data;
          });
          console.log('Fetched Orders: ', get().myOrders);
        } catch (error) {
          console.error('Failed to fetch orders', error);
        }
      },

      fetchUser: async () => {
        const access = localStorage.getItem('accessToken');
        try {
          const response = await axios.get('/users/detail', {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
          console.log(response.data);
          set((state) => {
            state.user = response.data;
            state.access = localStorage.getItem('accessToken');
          });
          console.log('Fetched User: ', get().user);
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
              Authorization: `Bearer ${get().access}`,
            },
          });
          console.log(response);
          setModal('Success to update');
          get().fetchUser();
        } catch (error) {
          setModal('Failed to update');
          console.error('Failed to update', error);
        }
      },

      logout: async () => {
        const access = localStorage.getItem('accessToken');
        const setModal = useModalStore.getState().setModal;
        try {
          const response = await axios.post('/users/logout', {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
          console.log('Success to logout. ', response);
          set({ user: null });
          set({ access: null });
          localStorage.removeItem('accessToken');
          setModal('Success to logout');
        } catch (error) {
          console.log('Failed to logout: ', error);
        }
      },

      deleteUser: async () => {
        const access = localStorage.getItem('accessToken');
        const setModal = useModalStore.getState().setModal;

        try {
          const response = await axios.delete('/users/detail', {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          });
          console.log(response);
          set({ user: null });
          setModal('Success to delete account');
        } catch (error) {
          console.error('Failed delete user: ', error);
          setModal('Failed to delete account');
        }
      },
    })),
    {
      name: 'userInfo',
      serialize: (state) => JSON.stringify(state?.state?.user),
    },
  ),
);

export default useAccountStore;
