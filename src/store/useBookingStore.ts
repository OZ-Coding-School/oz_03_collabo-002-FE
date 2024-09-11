import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type BookingData = {
  class_id: string | number; // 클래스 아이디
  options?: string; // 옵션
  class_date_id: string | null; // 일정 - 날짜, 시간
  quantity: number; // 인원수
  referral_code?: string; // 추천인
  amount?: number;
  title: string;
} | null;

type BookingState = {
  bookingItem: BookingData | null;
  addBookingItem: (bookingData: BookingData) => void;
};

const useBookingStore = create<BookingState>()(
  immer((set, get) => ({
    bookingItem: null,

    addBookingItem: (bookingData: BookingData) => {
      const currentBooking = get().bookingItem;

      if (!currentBooking) {
        set((state) => {
          state.bookingItem = bookingData;
        });
      } else {
        console.log('이미 예약이 존재합니다.');
      }
    },
  })),
);

export default useBookingStore;
