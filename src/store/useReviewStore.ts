import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  AllReview,
  Review,
  ReviewAction,
  ReviewState,
} from '../type/review.type';
import axios from '../api/axios';
import { useUserStore } from './useUser';

const useReviewStore = create<ReviewState & ReviewAction>()(
  immer((set) => ({
    reviews: null,
    myReviews: null,

    getReviews: async (classId) => {
      try {
        const response = await axios.get(`/reviews/${classId}`);
        console.log('classId: ', classId);
        // const data: Review[] = response.data;
        const data: AllReview = response.data;
        console.log('data: ', data);
        // const reviewss = data.reviews;
        // console.log('data: ', data.reviews);

        // 아래 filteredData의 반환 타입은 {review: Review}[]로 인식 => 콘솔로 확인
        // const filteredData1 = data.reviews.filter((item) => {
        //   console.log('item.class_id: ', item.review.class_id);
        //   return item.review.class_id.toString() === classId?.toString();
        // });
        // console.log('filterData1 : ', filteredData1);

        const filteredData = data.reviews
          .filter((item) => Number(item.review.class_id) === Number(classId))
          .map((item) => item.review); // 여기서 변환
        console.log('filterData : ', filteredData);
        set({ reviews: filteredData });

        // const filteredData = data.filter((item) => item.class_id === classId);
        // console.log('filterData: ', filteredData);
        // set({ reviews: filteredData });
      } catch (error) {
        console.log('Failed to get reviews: ', error);
      }
    },
    getMyReviews: async () => {
      const user = useUserStore.getState().user;
      try {
        const response = await axios.get('/reviews');
        const data: Review[] = response.data;
        const filteredData = data.filter(
          (item) => item.user.id.toString() === user?.id,
        );
        set({ myReviews: filteredData });
      } catch (error) {
        console.log('Failed to get my reviews: ', error);
      }
    },
  })),
);

export default useReviewStore;
