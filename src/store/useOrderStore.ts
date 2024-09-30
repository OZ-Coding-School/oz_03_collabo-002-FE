import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import axios from '../api/axios';
import { BookingData } from './useBookingStore';
import { OrderList, OrderStore } from '../type/order.type';

export const useOrderStore = create<OrderStore>()(

  immer((set, get) => ({
    orderData: null,
    captureData: null,
    payments: null,
    loading: false,
    error: null,

    // 결제 내역 조회
    fetchPayments: async () => {
      set((state) => ({ ...state, loading: true, error: null }));
      try {
        const response = await axios.get(
          `/payments/`,
          {
            params: {
              page: 1,
              size: 10
            }
          }
        );
        const myOrderData: OrderList = await response.data;
        set((state) => ({ ...state, payments: myOrderData, loading: false }));
        console.log(get().payments)
      } catch (error) {
        set((state) => ({
          ...state,
          error: `Failed to fetch payments: ${error}`,
          loading: false,
        }));
      }
    },

    // 결제 생성
    newOrder: async (data: BookingData) => {
      try {
        const response = await axios.post('/payments', {
          class_id: data?.class_id,
          options: data?.options,
          class_date_id: data?.class_date_id,
          quantity: data?.quantity,
          referral_code: data?.referral_code
        })
        const newOrderResData = response.data
        console.log(newOrderResData)
      } catch (error) {
        set((state) => ({
          ...state,
          error: `Failed to create new order: ${error}`,
          loading: false,
        }));
      }
    },

    // 추천 코드 유효성 검사
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

);
