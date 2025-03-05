// src/components/AdminRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);
  
  // Debug logging to ensure token and user are available
  console.log("AdminRoute token:", token);
  console.log("AdminRoute user:", user);

  // If not logged in, redirect to login
  if (!token) return <Navigate to="/login" />;
  
  // If logged in but not an admin, redirect to home
  if (!user || user.role !== 'admin') return <Navigate to="/" />;
  
  return children;
};

export default AdminRoute;
