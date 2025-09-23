import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_LIVE
  : import.meta.env.VITE_API_URL_DEV;

const createHttpClient = () => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  client.interceptors.request.use(
    (config) => {
      const { token } = useAuthStore.getState();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401 && typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const $api = createHttpClient();
export default $api;
