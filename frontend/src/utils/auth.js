// Gestión de autenticación admin
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const adminAuth = {
  login: async (password) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_login_time', new Date().getTime().toString());
        return { success: true, token: data.token };
      }
      return { success: false, message: data.message || 'Contraseña incorrecta' };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'Error de conexión con el servidor' };
    }
  },

  logout: () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_login_time');
  },

  isAuthenticated: () => {
    return localStorage.getItem('admin_authenticated') === 'true';
  },

  getToken: () => {
    return localStorage.getItem('admin_token');
  },

  verificarSesionExpirada: () => {
    const loginTime = localStorage.getItem('admin_login_time');
    if (!loginTime) return true;

    const currentTime = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas for the JWT token roughly
    return (currentTime - parseInt(loginTime, 10)) > sessionDuration;
  }
};