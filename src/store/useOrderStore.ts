import { create } from 'zustand';
import { OrderList, OrderStore } from '../type/order.type';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from '../api/axios';

export const useOrderStore = create<OrderStore>()(
  persist(
    immer((set) => ({
      payments: null,
      loading: false,
      error: null,
      fetchPayments: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          const response = await fetch(`/payments/?page=1&size=10`);
          const data: OrderList = await response.json(); // JSON 변환
          set((state) => ({ ...state, payments: data, loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error: `Failed to fetch payments: ${error}`, loading: false }));
        }
      },
      createPayment: async (paymentData) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await axios.post(`/payments/`, paymentData);
          set((state) => ({ ...state, loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error:`Failed to create payments: ${error}`, loading: false }));
        }
      },
      createPayPalOrder: async (amount) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await axios.post(`/payments/paypal/orders/`, amount);
          set((state) => ({ ...state, loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error: `Failed to create order paypal: ${error}`, loading: false }));
        }
      },
      capturePayPalOrder: async (orderId, captureData) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await axios.post(
            `/payments/paypal/orders/${orderId}/capture/`,
            captureData,
          );
          set((state) => ({ ...state, loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error: `Failed to capture paypal order: ${error}`, loading: false }));
        }
      },
      validateReferralCode: async (code) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await axios.get(`/payments/referral/?code=${code}`);
          set((state) => ({ ...state, loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error: `Failed to validate referral code: ${error}`, loading: false }));
        }
      },
      refundPayment: async (paymentId) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await axios.post(`/payments/paypal/refund/${paymentId}/`);
          set((state) => ({ ...state, loading: false }));
        } catch (error) {
          set((state) => ({ ...state, error: `Failed to refund payment: ${error}`, loading: false }));
        }
      },
    })),
    {
      name: 'orderInfo',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);