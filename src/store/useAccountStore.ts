import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AccountActions, AccountState } from '../type/account.type';
import axios from '../api/axios';
import { useModalStore } from './useModal';

const useAccountStore = create<AccountState & AccountActions>()(
  immer((set, get) => ({
    user: null,
    access: null,
    refresh: null,
    myOrders: [],

    fetchMyOrder: async (token) => {
      try {
        const response = await axios.get('/history', {
          headers: {
            Authorization: `Bearer ${token}`,
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
      try {
        const response = await axios.get('/users/detail');
        set({ user: response.data });
        console.log('Fetched User: ', get().user);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    },

    updateUser: async (name) => {
      const setModal = useModalStore.getState().setModal;
      const user = get().user;

      if (!user || !user.id) {
        console.error('User ID is missing or undefined');
        return;
      }
      const updateData: { name: string } = {
        name: name,
      };
      try {
        const response = await axios.patch('/users/detail', updateData);
        console.log(response);
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
        const response = await axios.delete('/users/detail');
        console.log(response);
        set({ user: null });
        setModal('Success to delete account');
      } catch (error) {
        console.error('Failed delete user: ', error);
        setModal('Failed to delete account');
      }
    },
  })),
);

export default useAccountStore;
