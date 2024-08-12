import axios from 'axios';

const instance = axios.create({
  // baseURL: '/',
  baseURL: import.meta.env.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
