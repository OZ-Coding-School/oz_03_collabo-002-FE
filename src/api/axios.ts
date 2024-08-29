import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.custom-k.store/v1/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
