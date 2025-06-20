import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

// Axios global config
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = false; // ❌ Token-based auth doesn't use cookies

// Automatically attach Bearer token to every request
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

// Auth context setup
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch the authenticated user
  const fetchUser = async () => {
    try {
      const res = await axios.get('/api/user');
      setUser(res.data);
    } catch (err) {
      console.error('[AuthContext] Not authenticated', err?.response?.data);
      setUser(null);
    }
  };

  // Login with email/password
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/login', { email, password }); // ✅ fixed path

      const token = res.data.token || res.data.access_token;
      if (!token) throw new Error('No token returned from API');

      localStorage.setItem('authToken', token);
      await fetchUser();
    } catch (err) {
      console.error('[Login failed]', err?.response?.data || err.message);
      throw err;
    }
  };

  // Logout and clear token
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

  // Auto-fetch user if token exists
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
