import { create } from 'zustand';

export type BookingData = {
  class_id: string | number; // 클래스 아이디
  options?: string; // 옵션
  class_date_id: string | number; // 일정 - 날짜, 시간
  quantity: number; // 인원수
  referral_code?: string; // 추천인
  amount?: number;
  title: string;
};

type BookingState = {
  bookingItem: BookingData | null;
  addBookingItem: (bookingData: BookingData) => void;
};

const useBookingStore = create<BookingState>((set, get) => ({
  bookingItem: null,

  addBookingItem: (bookingData: BookingData) => {
    // const currentBooking = get().bookingItem;
    set({ bookingItem: bookingData });

    // if (!currentBooking) {
    //   set({ bookingItem: bookingData });
    // } else {
    //   console.log('이미 예약이 존재합니다.');
    // }
  },
}));

export default useBookingStore;
