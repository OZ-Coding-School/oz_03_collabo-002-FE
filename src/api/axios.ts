import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1',
  //baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
