import { sendEmail, getInscripcionEmailTemplate } from '../utils/emailService.js';
import { sendWhatsAppMessage } from '../utils/whatsappService.js';

export const registrarInscripcion = async (req, res) => {
  try {
    // Los datos ya están validados y sanitizados por Zod
    const { nombreNino, edad, nombreAdulto, telefono, email, horario, mensaje } = req.body;

    console.log('📝 Nueva inscripción recibida:', { 
      nombreNino, 
      edad, 
      nombreAdulto, 
      telefono: telefono ? '***' + telefono.slice(-3) : 'no proporcionado',
      email: email ? '***' + email.slice(-5) : 'no proporcionado',
      horario 
    });

    let emailEnviado = false;
    let whatsappEnviado = false;

    // 1. ENVIAR EMAIL A LA DUEÑA
    try {
      const mensajeContacto = `Hola ${nombreAdulto}, soy July de Taller Paradise. Recibí la inscripción de ${nombreNino} para el horario de ${horario}. ¿Te parece si coordinamos los detalles? ¡Estoy muy emocionada de tener a ${nombreNino} en el taller! 🎨`;
      
      const enlaceWhatsApp = `https://wa.me/${telefono.replace('+', '')}?text=${encodeURIComponent(mensajeContacto)}`;
      
      const emailHtml = getInscripcionEmailTemplate({
        nombreNino, edad, nombreAdulto, telefono, email, horario, mensaje, enlaceWhatsApp
      });
      
      await sendEmail({
        from: `"Taller Paradise" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_DUENA,
        subject: '🎨 ¡NUEVA INSCRIPCIÓN RECIBIDA! - Taller Paradise',
        html: emailHtml
      });
      emailEnviado = true;
      console.log('✅ Email enviado correctamente a la dueña');
    } catch (emailError) {
      console.log('❌ Error enviando email a la dueña:', emailError.message);
    }

    // 2. ENVIAR WHATSAPP A LA DUEÑA
    try {
      const mensajeWhatsApp = `🧑‍🎨 NUEVA INSCRIPCIÓN - Taller Paradise

👶 Niño/a: ${nombreNino}
🎂 Edad: ${edad} años
👤 Responsable: ${nombreAdulto}
📞 Teléfono: ${telefono}
📧 Email: ${email}
🕒 Horario: ${horario}
${mensaje ? `💬 Mensaje: ${mensaje}` : ''}

¡Contacta al responsable lo antes posible! 🎨`;

      await sendWhatsAppMessage(process.env.NUMERO_DUENA_WHATSAPP, mensajeWhatsApp);
      whatsappEnviado = true;
      console.log('✅ WhatsApp enviado correctamente a la dueña');
    } catch (whatsappError) {
      console.log('❌ Error enviando WhatsApp a la dueña:', whatsappError.message);
    }

    res.json({ 
      success: true, 
      message: 'Inscripción enviada correctamente. La dueña del taller te contactará pronto.',
      notifications: {
        email: emailEnviado,
        whatsapp: whatsappEnviado
      }
    });

  } catch (error) {
    console.error('💥 Error en el endpoint de inscripción:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};
