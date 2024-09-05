import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  Review,
  ReviewAction,
  ReviewState,
} from '../type/review.type';
import axios from '../api/axios';

const useReviewStore = create<ReviewState & ReviewAction>()(
  immer((set) => ({
    reviews: null,
    myReviews: null,

    getReviews: async (classId) => {
      try {
        const response = await axios.get(`/reviews/${classId}/`);
        const data: Review[] = response.data.reviews.map(
          (item: { review: Review }) => item.review,
        );
        set((state) => {
          state.reviews = data;
        });
      } catch (error) {
        console.log('Failed to get reviews: ', error);
      }
    },
    getMyReviews: async () => {
      try {
        const response = await axios.get('/reviews/?page=1&size=10');
        const data: Review[] = response.data.reviews.map(
          (item: { review: Review }) => item.review,
        );
        console.log(data);
        set({ myReviews: data });
      } catch (error) {
        console.log('Failed to get my reviews: ', error);
      }
    },
  })),
);

export default useReviewStore;
