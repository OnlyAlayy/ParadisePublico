// src/utils/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlToken = params.get("token");

  useEffect(() => {
    if (urlToken === import.meta.env.VITE_ADMIN_TOKEN) {
      localStorage.setItem("admin_token", urlToken);
      window.history.replaceState({}, '', '/admin/recuerdos');
    }
  }, [urlToken]);

  const token = localStorage.getItem("admin_token");
  const isValid = token === import.meta.env.VITE_ADMIN_TOKEN;
  
  return isValid ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;