// Gestión de autenticación admin
export const adminAuth = {
  login: (password) => {
    // En producción, esto haría una llamada al backend
    const isAuthenticated = password === import.meta.env.VITE_ADMIN_TOKEN
    if (isAuthenticated) {
      localStorage.setItem('admin_authenticated', 'true')
      localStorage.setItem('admin_token', import.meta.env.VITE_ADMIN_TOKEN)
    }
    return isAuthenticated
  },

  logout: () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_token')
  },

  isAuthenticated: () => {
    return localStorage.getItem('admin_authenticated') === 'true'
  },

  getToken: () => {
    return localStorage.getItem('admin_token')
  }
}