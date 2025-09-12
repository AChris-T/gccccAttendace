import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_LIVE
  : import.meta.env.VITE_API_URL_DEV;

const $api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

$api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('unauthorized'));
    }
    return Promise.reject(error);
  }
);

export default $api;
