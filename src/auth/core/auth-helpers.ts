import axios from 'axios';
import { useSessionStore } from 'store/useSessionStore';

export function setupAxios() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

  axios.interceptors.request.use((config) => {
    const { token } = useSessionStore.getState();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) useSessionStore.getState().logout();
      return Promise.reject(error);
    }
  );
}
