import { create } from 'zustand';

export interface BookingData {
  language: string;
  class: string;
  time: string;
  date: Date | null;
}

type BookingState = {
  bookingItem: BookingData | null;
  addBookingItem: (bookingData: BookingData) => void;
};

const useBookingStore = create<BookingState>((set, get) => ({
  bookingItem: null,

  addBookingItem: (bookingData: BookingData) => {
    const currentBooking = get().bookingItem;

    if (!currentBooking) {
      set({ bookingItem: bookingData });
    } else {
      console.log('이미 예약이 존재합니다.');
    }
  },
}));

export default useBookingStore;
