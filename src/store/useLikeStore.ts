import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { NavigateFunction } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from '../api/axios';
import LikeState, { LikeData } from '../type/like.type';

// 서버 응답 에러 타입 정의
interface ServerError {
  response?: {
    status: number;
  };
  message: string;
}

const useLikeStore = create<LikeState>()(
  immer((set, get) => ({
    likedClasses: [],

    // 찜 토글
    toggleLike: async (classId: string, navigate: NavigateFunction) => {
      const { likedClasses } = get();
      const isAlreadyLiked = likedClasses.includes(classId);
      // const navigate = useNavigate();
      try {
        if (isAlreadyLiked) {
          // 찜 해제
          await axios.delete(`/favorites/`, {
            params: { favorite_id: classId },
          });
          set((state) => {
            state.likedClasses = likedClasses.filter((id) => id !== classId);
          });
        } else {
          // 찜 추가
          await axios.post(`/favorites/`, null, {
            params: { class_id: classId },
          });
          set((state) => {
            state.likedClasses.push(classId);
          });
        }
      } catch (error) {
        // error를 AxiosError로 캐스팅
        const serverError = error as AxiosError<ServerError>;
        if (serverError?.response?.status === 401) {
          localStorage.removeItem('userInfo');
          if (
            window.confirm('회원만 이용할 수 있습니다. 로그인 하시겠습니까?')
          ) {
            navigate('/login');
          }
        }
        console.error('Error occurred while processing the like:', error);
      }
    },
    // 특정 상태가 찜 상태인지 확인
    isLiked: (classId) => get().likedClasses.includes(classId),

    // 찜한 클래스 목록 보기
    getLikedClasses: async () => {
      try {
        const response = await axios.get('/favorites/', {
          params: { page: 1, size: 10 },
        });
        const data: LikeData = response.data;
        set((state) => {
          state.likedClasses = data.results.map((item) => item.id.toString());
        });
      } catch (error) {
        console.log('Failed to fetch liked class list: ', error);
      }
    },
  })),
);

export default useLikeStore;
