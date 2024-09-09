import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Review, ReviewAction, ReviewState } from '../type/review.type';
import axios from '../api/axios';

const useReviewStore = create<ReviewState & ReviewAction>()(
  immer((set) => ({
    reviews: null,
    myReviews: null,
    isUpdate: false,
    isDelete: null,
    hasMore: true,

    getReviews: async (classId, page = 1, size = 15) => {
      try {
        const response = await axios.get(
          `/reviews/${classId}/?page=${page}&size=${size}`,
        );
        const newReviews: Review[] = response.data.reviews.map(
          (item: { review: Review }) => item.review,
        );
        set((state) => {
          if (page === 1) {
            state.reviews = newReviews;
          } else {
            state.reviews?.push(...newReviews); // spread 연산자 대신 push 메서드 사용
          }
          state.hasMore = newReviews.length === size;
        });
        return newReviews;
      } catch (error) {
        console.log('Failed to get reviews: ', error);
        return [];
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
    setIsUpdate: () => set((state) => ({ isUpdate: !state.isUpdate })),
    setIsDelete: async (classId, reviewId) => {
      try {
        const response = await axios.delete(
          `reviews/${classId}/update/${reviewId}`,
        );
        console.log('delete response: ', response);
        set((state) => ({
          reviews:
            state.reviews?.filter((review) => review.id !== reviewId) || null,
        }));
      } catch (error) {
        console.log('delete error: ', error);
      }
    },
  })),
);

export default useReviewStore;
