import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

// Axios Global Configuration
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = false;

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Create Auth Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user');
      const data = res.data?.user || res.data; // handle both { user: {...} } and just { ... }
      console.log('[AuthContext] User fetched:', data);
      setUser(data);
    } catch (err) {
      console.error('[AuthContext] Not authenticated', err?.response?.data || err.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/login', { email, password });

      const token = res.data.token || res.data.access_token;
      if (!token) throw new Error('No token returned from API');

      localStorage.setItem('authToken', token);
      await fetchUser();
    } catch (err) {
      console.error('[Login failed]', err?.response?.data || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (err) {
      console.error('[Logout failed]', err?.response?.data || err.message);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};
