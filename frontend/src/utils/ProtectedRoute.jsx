import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const urlToken = params.get("token");

  const URL_TOKEN = import.meta.env.VITE_URL_TOKEN;

  useEffect(() => {
    // Si hay token en la URL y es válido, guardarlo en localStorage
    if (urlToken && urlToken === URL_TOKEN) {
      console.log('✅ Token válido, guardando en localStorage');
      localStorage.setItem("admin_token", urlToken);
      // Limpiar la URL (opcional, pero seguro)
      window.history.replaceState({}, '', '/admin/recuerdos');
    }
  }, [urlToken, URL_TOKEN]);

  // Verificar si hay un token válido en localStorage
  const token = localStorage.getItem("admin_token");
  const isValid = token === URL_TOKEN;

  console.log('🔐 ProtectedRoute - Token válido:', isValid);

  // Si es válido, mostrar el panel; si no, redirigir al panel (que mostrará el login)
  return isValid ? children : <Navigate to="/admin/recuerdos" replace />;
};

export default ProtectedRoute;