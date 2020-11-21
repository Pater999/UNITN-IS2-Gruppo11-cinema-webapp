import axios from 'axios';
import store from '@/store/store';

const baseURL = process.env.VUE_APP_API ?? 'http://localhost:5000/api/v1/';

const axiosInstance = axios.create({
  baseURL: baseURL
});

axiosInstance.interceptors.request.use((config) => {
  if (store.state.token) config.headers.Authorization = `Bearer ${store.state.token}`;
  else config.headers.Authorization = '';
  return config;
});

export default axiosInstance;
