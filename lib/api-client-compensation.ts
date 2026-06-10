import axios from 'axios';
import { env } from '@/config/env';

export const compensationClient = axios.create({
  baseURL: env.NEXT_PUBLIC_COMPENSATION_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

compensationClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        window.location.href = '/signin';
      }
    }
    if (error.response?.status >= 500) {
      console.error('[compensationClient] Server error:', error.response?.data);
    }
    return Promise.reject(error);
  },
);
