import axios from 'axios';
import store from '@/store/store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1/'
});

axiosInstance.interceptors.request.use((config) => {
  if (store.state.token) config.headers.Authorization = `Bearer ${store.state.token}`;
  else config.headers.Authorization = '';
  return config;
});

export default axiosInstance;
