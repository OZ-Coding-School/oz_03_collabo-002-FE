import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.custom-k.store/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosUser = axios.create({
  baseURL: 'https://api.custom-k.store/v1/users',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 요청 헤더에 access 토큰을 추가합니다.
axiosUser.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401(권한 없음) 에러가 발생하면 토큰을 갱신합니다.
axiosUser.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response: { status } } = error;
    
    if (status === 401) {
      // 401 에러가 발생했을 때, refresh 토큰으로 access 토큰을 갱신합니다.
      const refreshToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('refreshToken='))
      ?.split('=')[1];
      
      if (!refreshToken) {
        // refresh 토큰이 없으면 로그인 페이지로 리디렉션하거나 다른 처리를 할 수 있습니다.
        return Promise.reject(error);
      }

      try {
        // 새로운 access 토큰을 요청합니다.
        const response = await axios.post('/users/token/refresh', {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });

        // 새로운 access 토큰을 저장합니다.
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 원래의 요청 헤더에 새로운 access 토큰을 설정하고 요청을 다시 시도합니다.
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosUser(config);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 처리합니다. (예: 로그아웃 처리 등)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
