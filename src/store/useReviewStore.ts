import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Review, ReviewAction, ReviewState } from '../type/review.type';
import axios from '../api/axios';
import { useUserStore } from './useUser';

const useReviewStore = create<ReviewState & ReviewAction>()(
  immer((set) => ({
    reviews: null,
    myReviews: null,

    getReviews: async (classId) => {
      try {
        const response = await axios.get(`/reviews/${classId}`);
        const data: Review[] = response.data;
        const filteredData = data.filter((item) => item.class_id === classId);
        set({ reviews: filteredData });
      } catch (error) {
        console.log('Failed to get reviews: ', error);
      }
    },
    getMyReviews: async () => {
      const user = useUserStore.getState().user;
      try {
        const response = await axios.get('/reviews');
        const data: Review[] = response.data;
        const filteredData = data.filter((item) => item.user.id === user?.id);
        set({ myReviews: filteredData });
      } catch (error) {
        console.log('Failed to get my reviews: ', error);
      }
    },
  })),
);

export default useReviewStore;
