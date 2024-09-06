import axios from 'axios';
import useAccountStore from '../store/useAccountStore';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'https://api.custom-k.store/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 요청에 엑세스 토큰 추가
instance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => Promise.reject(error));

// 응답 인터셉터: 401 오류 시 토큰 갱신
instance.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;
    const originalRequest = config;

    // 모든 401 오류에 대해 토큰 갱신 시도
    if (response && response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const regenerateToken = useAccountStore.getState().regenerateToken;
      try {
        await regenerateToken();
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패: ', refreshError);

        // 사용자를 로그인 페이지로 리다이렉션
        const navigate = useNavigate(); // React Router를 사용하는 경우
        navigate('/login'); // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
