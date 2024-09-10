import { create } from 'zustand';
import { OrderList, OrderStore } from '../type/order.type';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';
import axios from '../api/axios';

export const useOrderStore = create<OrderStore>()(
  persist(
    immer((set) => ({
      orderData: null,
      captureData: null,
      payments: null,
      loading: false,
      error: null,

      // 결제 내역 조회
      fetchPayments: async () => {
        set((state) => ({ ...state, loading: true, error: null }));
        const page = 1;
        const size = 10;
        try {
          const response = await axios.get(
            `/payments/?page=${page}&size=${size}`,
          );
          const data: OrderList = await response.data;
          console.log(data);
          set((state) => ({ ...state, payments: data, loading: false }));
        } catch (error) {
          set((state) => ({
            ...state,
            error: `Failed to fetch payments: ${error}`,
            loading: false,
          }));
        }
      },

      // Paypal 주문생성 api - SDK에서 처리됨
      // createPayPalOrder: async (amount) => {
      //   set((state) => ({ ...state, loading: true, error: null }));
      //   try {
      //     const response = await axios.post(`/payments/paypal/orders/`, amount);
      //     const data = response.data;
      //     set((state) => {
      //       state.orderData = data;
      //     });
      //     set((state) => ({ ...state, loading: false }));
      //   } catch (error) {
      //     set((state) => ({
      //       ...state,
      //       error: `Failed to create order paypal: ${error}`,
      //       loading: false,
      //     }));
      //   }
      // },

      // Paypal 결제내역 캡쳐 api - SDK에서 처리됨
      // capturePayPalOrder: async (captureData) => {
      //   const orderId = get().orderData?.id;
      //   set((state) => ({ ...state, loading: true, error: null }));
      //   try {
      //     const response = await axios.post(
      //       `/payments/paypal/orders/${orderId}/capture/`,
      //       captureData,
      //     );
      //     const data = response.data;

      //     set((state) => ({ ...state, loading: false }));
      //   } catch (error) {
      //     set((state) => ({
      //       ...state,
      //       error: `Failed to capture paypal order: ${error}`,
      //       loading: false,
      //     }));
      //   }
      // },

      // 푸펀 코드 유효성 검사
      validateReferralCode: async (code) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await axios.get(`/payments/referral/?code=${code}`);
          set((state) => ({ ...state, loading: false }));
        } catch (error) {
          set((state) => ({
            ...state,
            error: `Failed to validate referral code: ${error}`,
            loading: false,
          }));
        }
      },

      // 환불 처리
      refundPayment: async (paymentId) => {
        set((state) => ({ ...state, loading: true, error: null }));
        try {
          await axios.post(`/payments/paypal/refund/${paymentId}/`);
          set((state) => ({ ...state, loading: false }));
        } catch (error) {
          set((state) => ({
            ...state,
            error: `Failed to refund payment: ${error}`,
            loading: false,
          }));
        }
      },
    })),
    {
      name: 'orderInfo',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
