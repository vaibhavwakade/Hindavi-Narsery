// Temporary config for testing
export const API_BASE_URL = 'https://hindavi-nursery-backend.onrender.com/api';

// Debug function
export const debugAPI = () => {
  console.log('🔍 API Base URL:', API_BASE_URL);
  console.log('🔍 Environment variables:', import.meta.env);
  console.log('🔍 VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
};