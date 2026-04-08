import jwt from 'jsonwebtoken';

export const loginAdmin = (req, res) => {
  try {
    const { password } = req.body;
    const validPassword = process.env.ADMIN_TOKEN;

    if (!password || password !== validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Contraseña incorrecta',
      });
    }

    // Generate JWT token valid for 24 hours
    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET || 'fallback_secret_for_development_paradise',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      message: 'Autenticación exitosa'
    });
  } catch (error) {
    console.error('Error en el login admin:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno en la autenticación'
    });
  }
};
