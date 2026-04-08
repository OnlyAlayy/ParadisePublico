import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    // Los datos ya están validados y sanitizados por Zod
    const { image, resourceType } = req.body;

    console.log('📤 Recibiendo solicitud de upload:', {
      tieneImagen: !!image,
      resourceType,
      longitudBase64: image.length
    });

    try {
      const result = await cloudinary.uploader.upload(
        `data:${resourceType === 'video' ? 'video/mp4' : 'image/jpeg'};base64,${image}`,
        {
          folder: 'taller-paradise/recuerdos',
          resource_type: resourceType,
          quality: 'auto',
          fetch_format: 'auto'
        }
      );

      res.json({ 
        success: true, 
        message: 'Archivo subido correctamente',
        imageUrl: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type
      });

    } catch (cloudinaryError) {
      console.error('❌ Error de Cloudinary:', cloudinaryError);
      res.status(500).json({ 
        success: false, 
        message: 'Error de Cloudinary: ' + cloudinaryError.message 
      });
    }

  } catch (error) {
    console.error('❌ Error en endpoint upload:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor: ' + error.message 
    });
  }
};
