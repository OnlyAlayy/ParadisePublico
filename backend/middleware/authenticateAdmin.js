// middleware/authenticateAdmin.js - MIGRATED TO JWT
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req, res, next) => {
  const authToken = req.headers['x-auth-token'] || 
                   req.headers['authorization']?.replace('Bearer ', '');
  
  if (!authToken) {
    return res.status(401).json({ 
      success: false, 
      message: 'Acceso no autorizado. Token requerido.' 
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_for_development_paradise';
    const decoded = jwt.verify(authToken, secret);
    
    // We can attach the decoded token to the request if needed
    req.admin = decoded;
    
    console.log('✅ Acceso autorizado para admin mediante JWT');
    next();
  } catch (err) {
    console.log('❌ Token inválido o expirado:', err.message);
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acceso inválido o expirado.' 
    });
  }
};