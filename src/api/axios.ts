import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'https://api.malazoo.kr/v1',
  // baseURL: 'https://api.custom-k.store/v1',
  withCredentials: true, // 쿠키를 포함한 크로스 도메인 요청을 허용
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 필요한 경우 여기에 요청 전처리 로직을 추가할 수 있습니다.
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러이고 아직 재시도하지 않았다면
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 토큰 재발급 요청
        await axios.post(
          'https://api.custom-k.store/v1/users/token/refresh/',
          {},
          { withCredentials: true },
        );

        // 토큰 재발급 성공 시, 원래 요청 재시도
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // 토큰 갱신 실패 시 에러를 던져서 컴포넌트에서 처리하도록 함
        return Promise.reject({ ...error, tokenRefreshFailed: true });
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
