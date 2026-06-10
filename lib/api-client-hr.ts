import axios from 'axios';
import { env } from '@/config/env';

export const hrClient = axios.create({
  baseURL: env.NEXT_PUBLIC_HR_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

hrClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local session and redirect to sign-in
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        window.location.href = '/signin';
      }
    }
    if (error.response?.status >= 500) {
      console.error('[hrClient] Server error:', error.response?.data);
    }
    return Promise.reject(error);
  },
);
