import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.custom-k.store/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 요청에 엑세스 토큰 추가
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 오류 시 토큰 갱신
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;
    const accessToken = localStorage.getItem('accessToken');

    // 리프레시 토큰 요청인 경우 Authorization 헤더를 제외
    if (accessToken && !config.url?.includes('/users/token/refresh/')) {
      originalRequest._retry = true;
      console.log('refresh token으로 재발급');

      try {
        // 토큰 재발급 요청
        const refreshResponse = await axios.post(
          'https://api.custom-k.store/v1/users/token/refresh/',
          {},
          {
            withCredentials: true,
          },
        );

        const { access_token } = refreshResponse.data;
        if (access_token) {
          localStorage.setItem('accessToken', access_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error('토큰 갱신 실패: ', refreshError);
        // 토큰 갱신 실패 시 로컬 스토리지 클리어
        localStorage.removeItem('accessToken');
        // 여기서 직접 리다이렉트하는 대신 에러를 던져서 컴포넌트에서 처리하도록 함
        return Promise.reject({ ...error, tokenRefreshFailed: true });
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
