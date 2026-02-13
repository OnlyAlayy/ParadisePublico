// src/utils/ProtectedRoute.jsx - VERSIÓN CON DEBUG
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlToken = params.get("token");

  console.log('🔐 DEBUG ProtectedRoute:');
  console.log('URL Token:', urlToken);
  console.log('Env Token:', import.meta.env.VITE_ADMIN_TOKEN);
  console.log('LocalStorage Token:', localStorage.getItem('admin_token'));

  useEffect(() => {
    console.log('🔄 useEffect ejecutándose...');
    if (urlToken === import.meta.env.VITE_ADMIN_TOKEN) {
      console.log('✅ Token VÁLIDO - Guardando en localStorage');
      localStorage.setItem("admin_token", urlToken);
      window.history.replaceState({}, '', '/admin/recuerdos');
    } else {
      console.log('❌ Token INVÁLIDO o no coincide');
      console.log('URL Token:', urlToken);
      console.log('Expected:', import.meta.env.VITE_ADMIN_TOKEN);
    }
  }, [urlToken]);

  const token = localStorage.getItem("admin_token");
  const isValid = token === import.meta.env.VITE_ADMIN_TOKEN;
  
  console.log('🔍 Resultado final - Acceso:', isValid ? 'PERMITIDO' : 'DENEGADO');
  
  return isValid ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;