import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AccountActions, AccountState, User } from '../type/account';
import axios from '../api/axios';

const useAccountStore = create<AccountState & AccountActions>()(
  immer((set, get) => ({
    user: null,
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
        const currentUser: User = response.data[0];
        set({ user: currentUser });
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    },
  })),
);

export default useAccountStore;
