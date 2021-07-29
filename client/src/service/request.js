import axios from 'axios';
import { getUserToken, clearUser } from '../helpers/utils';
const axiosInstance = axios.create({
  baseURL: "http://54.179.121.183:8000",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance