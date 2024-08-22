import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AccountActions, AccountState } from '../type/account';
import axios from '../api/axios';

const useAccountStore = create<AccountState & AccountActions>()(
  immer((set, get) => ({
    user: null,
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
  })),
);

export default useAccountStore;
