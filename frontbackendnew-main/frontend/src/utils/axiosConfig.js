import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Adjust if your API prefix differs
  withCredentials: true, // Useful for Sanctum or session-based auth
  headers: {
    'Accept': 'application/json',
  },
});

// ✅ Automatically attach Bearer token from localStorage
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If it's a FormData, remove 'Content-Type' so the browser sets correct boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  error => Promise.reject(error)
);

// ✅ Handle 401 errors: redirect to /login (unless already there)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const isOnAuthPage = ['/login', '/register'].some(path =>
        window.location.pathname.startsWith(path)
      );

      if (!isOnAuthPage) {
        console.warn('⛔ Unauthorized — redirecting to /login...');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
