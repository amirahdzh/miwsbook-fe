import axios from "axios";
import { APP_CONFIG } from "../config/app";

// API Public (tanpa autentikasi)
export const publicApi = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API Private (dengan autentikasi)
export const privateApi = axios.create({
  baseURL: APP_CONFIG.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tambahkan interceptor untuk menyisipkan token ke privateApi
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
