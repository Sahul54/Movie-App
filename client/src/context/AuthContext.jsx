
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as jwtDecodeModule from 'jwt-decode';

const jwtDecode =
  jwtDecodeModule.default !== undefined
    ? jwtDecodeModule.default
    : jwtDecodeModule;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromStorage = localStorage.getItem('token');
  const [token, setToken] = useState(tokenFromStorage || null);
  const [user, setUser] = useState(null);

  // Decode token to get user info (e.g., role)
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id, role: decoded.role });
      } catch (error) {
        console.error("Error decoding token", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  const API_URL = 'http://localhost:5000/api/auth';

  const login = async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    }
  };

  const register = async (username, password, role = 'user') => {
    try {
      await axios.post(`${API_URL}/register`, { username, password, role });
      // Optionally log the user in immediately after registration
      await login(username, password);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
