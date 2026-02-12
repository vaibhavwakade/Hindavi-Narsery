export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const debugAPI = () => {
  console.log('API Base URL:', API_BASE_URL);
  console.log('VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
};
