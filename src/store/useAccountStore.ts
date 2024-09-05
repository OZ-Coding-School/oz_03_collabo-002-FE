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
        const response = await axios.patch('/users/detail', dataToSend);
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
