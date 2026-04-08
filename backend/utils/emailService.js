import nodemailer from 'nodemailer';

let transporter;

export const initEmailService = () => {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

export const getInscripcionEmailTemplate = ({ nombreNino, edad, nombreAdulto, telefono, email, horario, mensaje, enlaceWhatsApp }) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
      body { font-family: 'Poppins', sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
      .header { background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); padding: 40px 20px; text-align: center; color: white; }
      .header h1 { margin: 0; font-size: 32px; font-weight: 700; }
      .header p { margin: 10px 0 0; font-size: 18px; opacity: 0.9; }
      .content { padding: 40px; }
      .info-section { background: #f8f9fa; border-radius: 15px; padding: 25px; margin-bottom: 25px; border-left: 5px solid #4ECDC4; }
      .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
      .info-item { background: white; padding: 15px; border-radius: 10px; border: 1px solid #e9ecef; }
      .info-label { font-weight: 600; color: #6c757d; font-size: 14px; }
      .info-value { font-weight: 500; color: #2c3e50; font-size: 16px; margin-top: 5px; }
      .contact-actions { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); padding: 25px; border-radius: 15px; text-align: center; }
      .btn { display: inline-block; padding: 12px 25px; margin: 8px; border-radius: 50px; text-decoration: none; font-weight: 600; transition: all 0.3s ease; }
      .btn-whatsapp { background: #25D366; color: white; }
      .btn-call { background: #4A90E2; color: white; }
      .btn-email { background: #EA4335; color: white; }
      .btn:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
      .footer { text-align: center; padding: 20px; background: #2c3e50; color: white; font-size: 12px; }
      .highlight { background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%); padding: 20px; border-radius: 15px; text-align: center; margin: 20px 0; }
      @media (max-width: 600px) {
        .info-grid { grid-template-columns: 1fr; }
        .btn { display: block; margin: 8px 0; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>¡Nueva Inscripción!</h1>
        <p>Taller Paradise - Un nuevo artista se une a nuestra familia</p>
      </div>
      
      <div class="content">
        <div class="highlight">
          <h2 style="margin: 0; color: #2c3e50;">¡Buenas noticias! 🎉</h2>
          <p style="margin: 10px 0 0; font-size: 16px; color: #2c3e50;">Tienes una nueva inscripción esperando por ti</p>
        </div>

        <div class="info-section">
          <h3>Información del Pequeño Artista</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nombre del Niño/a</div>
              <div class="info-value">${nombreNino}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Edad</div>
              <div class="info-value">${edad} años</div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>Información del Responsable</h3>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Nombre del Adulto</div>
              <div class="info-value">${nombreAdulto}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Teléfono</div>
              <div class="info-value"><a href="tel:${telefono}" style="color: #4A90E2; text-decoration: none;">${telefono}</a></div>
            </div>
            <div class="info-item">
              <div class="info-label">Email</div>
              <div class="info-value"><a href="mailto:${email}" style="color: #EA4335; text-decoration: none;">${email}</a></div>
            </div>
            <div class="info-item">
              <div class="info-label">Horario Preferido</div>
              <div class="info-value" style="color: #e74c3c; font-weight: 600;">${horario}</div>
            </div>
            ${mensaje ? `
            <div class="info-item" style="grid-column: 1 / -1;">
              <div class="info-label">Mensaje Adicional</div>
              <div class="info-value">${mensaje}</div>
            </div>
            ` : ''}
          </div>
        </div>

        <div class="contact-actions">
          <h3 style="margin-top: 0; color: #2c3e50;">📞 Contacta al Responsable</h3>
          <p style="color: #6c757d; margin-bottom: 20px;">Haz clic en cualquiera de estas opciones para contactar inmediatamente</p>
          
          <a href="${enlaceWhatsApp}" class="btn btn-whatsapp" target="_blank">
            💬 Enviar WhatsApp
          </a>
          <a href="tel:${telefono}" class="btn btn-call">
            📞 Llamar por Teléfono
          </a>
          <a href="mailto:${email}" class="btn btn-email">
            📧 Enviar Email
          </a>
        </div>
      </div>
      
      <div class="footer">
        <p>Taller Paradise • Notificación automática • ${new Date().toLocaleString('es-AR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
      </div>
    </div>
  </body>
  </html>
`;

export const sendEmail = async (options) => {
  if (!transporter) initEmailService();
  return transporter.sendMail(options);
};
