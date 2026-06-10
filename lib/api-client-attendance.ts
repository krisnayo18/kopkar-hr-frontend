import axios from 'axios';
import { env } from '@/config/env';

export const attendanceClient = axios.create({
  baseURL: env.NEXT_PUBLIC_ATTENDANCE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

attendanceClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        window.location.href = '/signin';
      }
    }
    if (error.response?.status >= 500) {
      console.error('[attendanceClient] Server error:', error.response?.data);
    }
    return Promise.reject(error);
  },
);
