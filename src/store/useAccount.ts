import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AccountActions, AccountState, User } from '../type/account';
import axios from '../api/axios';
import { useModalStore } from './useModal';

const useAccountStore = create<AccountState & AccountActions>()(
  immer((set, get) => ({
    user: null,
    access: null,
    refresh: null,
    myOrders: [],

    fetchUser: async () => {
      try {
        const response = await axios.get('/api/v1/user');
        set((state) => {
          state.user = response.data;
        });
        console.log('Fetched User: ', get().user);
      } catch (error) {
        console.log('Failed to fetch user', error);
      }
    },

    fetchMyOrder: async (token: string) => {
      try {
        const response = await axios.get('/api/v1/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        set((state) => {
          state.myOrders = response.data;
        });
        console.log('Fetched Orders: ', get().myOrders);
      } catch (error) {
        console.log('Failed to fetch orders', error);
      }
    },
    updateUser: async (data) => {
      const setModal = useModalStore.getState().setModal;
      const user = get().user;

      if (!user || !user.id) {
        console.error('User ID is missing or undefined');
        return;
      }

      try {
        const updateData: User = {
          ...user,
          ...(data.name !== undefined && { name: data.name }),
          ...(data.avatar !== undefined && { avatar: data.avatar }),
        };

        setModal('Success to update');
        set({ user: updateData });
      } catch (error) {
        setModal('Failed to update');
        console.log('Failed to update', error);
      }
    },
  })),
);

export default useAccountStore;
