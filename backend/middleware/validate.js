// Middleware genérico de validación con Zod
export const validate = (schema) => (req, res, next) => {
  try {
    // Parse y sanitiza el body — reemplaza req.body con los datos limpios
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    // Zod lanza ZodError con un array de issues
    const mensajes = error.errors?.map(e => e.message) || ['Datos inválidos'];
    
    console.log('⚠️ Validación fallida:', mensajes);
    
    return res.status(400).json({
      success: false,
      message: 'Error de validación',
      errors: mensajes
    });
  }
};
