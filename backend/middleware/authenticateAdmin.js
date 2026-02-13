// middleware/authenticateAdmin.js - VERSIÓN MEJORADA
export const authenticateAdmin = (req, res, next) => {
  const authToken = req.headers['x-auth-token'] || 
                   req.headers['authorization']?.replace('Bearer ', '');
  
  const validToken = process.env.ADMIN_TOKEN;

  if (!authToken || authToken !== validToken) {
    console.log('❌ Intento de acceso no autorizado:', {
      providedToken: authToken ? '***' + authToken.slice(-4) : 'none',
      expectedToken: validToken ? '***' + validToken.slice(-4) : 'not configured'
    });
    
    return res.status(401).json({ 
      success: false, 
      message: 'Acceso no autorizado. Token de administrador requerido.' 
    });
  }
  
  console.log('✅ Acceso autorizado para admin');
  next();
};