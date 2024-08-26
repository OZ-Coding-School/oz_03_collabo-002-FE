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

    fetchMyOrder: async (token) => {
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
    fetchUser: async () => {
      try {
        const response = await axios.get(`/api/v1/user`);
        const currentUser: User = response.data;
        set({ user: currentUser });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    },
    updateUser: async (data) => {
      const setModal = useModalStore.getState().setModal; // Store A의 함수를 가져옴
      const user = get().user;
      
      if (!user || !user.id) {
        console.error('User ID is missing or undefined');
        return;
      }
      const updateData: User = {
        ...user,
        id: user.id,
        ...(data.name !== undefined && { name: data.name }),
        ...(data.avatar !== undefined && { avatar: data.avatar }),
      };
      try {
        const response = await axios.put('/api/v1/user', updateData);
        console.log(response);

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
