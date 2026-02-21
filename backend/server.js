// server.js (CON MONGODB - VERSIÓN FINAL CON CAMPO COMO NOS ENCONTRO - BOTONES 2+1 EN MÓVIL)
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import twilio from 'twilio'
import cloudinary from 'cloudinary'
import mongoose from 'mongoose'
import Recuerdo from './models/Recuerdo.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Configuración de Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Conectar a MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taller-paradise';
    await mongoose.connect(mongoURI);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

connectDB();

// Middleware CORS mejorado para producción
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://taller-paradise.vercel.app',
    'https://taller-paradise-frontend.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Middleware de autenticación simple para admin
const authenticateAdmin = (req, res, next) => {
  const authToken = req.headers['x-auth-token'] || req.headers['authorization']
  
  const validToken = process.env.ADMIN_TOKEN || 'taller-paradise-admin-2024'
  
  if (!authToken || authToken !== validToken) {
    return res.status(401).json({ 
      success: false, 
      message: 'Acceso no autorizado. Token de administrador requerido.' 
    })
  }
  next()
}

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true para puerto 465, false para 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Ayuda a evitar bloqueos de certificados en la nube
  }
});

// Configuración de Twilio
const twilioClient = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// Función para generar enlace de WhatsApp
const generarEnlaceWhatsApp = (telefono, mensaje) => {
  const mensajeCodificado = encodeURIComponent(mensaje)
  return `https://wa.me/${telefono.replace('+', '')}?text=${mensajeCodificado}`
}

// ============================
// ENDPOINTS
// ============================

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend de Taller Paradise funcionando correctamente con MongoDB',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    database: 'MongoDB'
  })
})

// ✅ ENDPOINT DE INSCRIPCIÓN ACTUALIZADO CON CAMPO "COMO NOS ENCONTRO"
app.post('/api/inscripcion', async (req, res) => {
  try {
    // ✅ AGREGAMOS "comoNosEncontro" A LA DESTRUCTURACIÓN
    const { nombreNino, edad, nombreAdulto, telefono, email, horario, comoNosEncontro, mensaje } = req.body

    console.log('📝 Nueva inscripción recibida:', { 
      nombreNino, 
      edad, 
      nombreAdulto, 
      telefono: telefono ? '***' + telefono.slice(-3) : 'no proporcionado',
      email: email ? '***' + email.slice(-5) : 'no proporcionado',
      horario,
      // ✅ AGREGAMOS LOG DEL NUEVO CAMPO
      comoNosEncontro: comoNosEncontro || 'No especificado',
      mensaje: mensaje ? 'Sí' : 'No'
    })

    // Validar campos requeridos
    if (!nombreNino || !edad || !nombreAdulto || !telefono || !email || !horario) {
      return res.status(400).json({ 
        success: false, 
        message: 'Todos los campos son requeridos' 
      })
    }

    let emailEnviado = false
    let whatsappEnviado = false

    // 1. ENVIAR EMAIL A LA DUEÑA (ACTUALIZADO CON COMO NOS ENCONTRO)
    try {
      const mensajeContacto = `Hola ${nombreAdulto}, soy July de Taller Paradise. Recibí la inscripción de ${nombreNino} para el horario de ${horario}. ¿Te parece si coordinamos los detalles? ¡Estoy muy emocionada de tener a ${nombreNino} en el taller! 🎨`
      const enlaceWhatsApp = generarEnlaceWhatsApp(telefono, mensajeContacto)
      
      // ✅ MAPA DE ICONOS PARA MOSTRAR EN EL EMAIL
      const iconosComoNosEncontro = {
        'Instagram': '📸',
        'Facebook': '📘',
        'Google': '🔍',
        'Recomendación': '💬',
        'WhatsApp': '📱',
        'Volante': '📄',
        'Otro': '✨'
      }
      
      const iconoSeleccionado = iconosComoNosEncontro[comoNosEncontro] || '🔍'
      
      const mailOptions = {
        from: `"Taller Paradise" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_DUENA,
        subject: '🎨 ¡NUEVA INSCRIPCIÓN RECIBIDA! - Taller Paradise',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              body { 
                font-family: 'Poppins', sans-serif; 
                margin: 0; 
                padding: 0; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                width: 100%;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
              }
              .container { 
                max-width: 600px; 
                width: 100%;
                margin: 20px auto; 
                background: white; 
                border-radius: 20px; 
                overflow: hidden; 
                box-shadow: 0 20px 40px rgba(0,0,0,0.1); 
              }
              .header { 
                background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%); 
                padding: 30px 20px; 
                text-align: center; 
                color: white; 
              }
              .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: 700; 
                line-height: 1.3;
              }
              .header p { 
                margin: 10px 0 0; 
                font-size: 16px; 
                opacity: 0.9; 
              }
              .content { 
                padding: 25px 20px; 
              }
              .info-section { 
                background: #f8f9fa; 
                border-radius: 15px; 
                padding: 20px; 
                margin-bottom: 20px; 
                border-left: 5px solid #4ECDC4; 
              }
              .info-section h3 {
                font-size: 18px;
                margin-bottom: 15px;
                color: #2c3e50;
              }
              .info-grid { 
                display: grid; 
                grid-template-columns: 1fr 1fr; 
                gap: 12px; 
              }
              .info-item { 
                background: white; 
                padding: 12px; 
                border-radius: 10px; 
                border: 1px solid #e9ecef;
                word-break: break-word;
                overflow-wrap: break-word;
              }
              .info-label { 
                font-weight: 600; 
                color: #6c757d; 
                font-size: 13px; 
                margin-bottom: 4px;
              }
              .info-value { 
                font-weight: 500; 
                color: #2c3e50; 
                font-size: 15px; 
                line-height: 1.4;
              }
              .info-value a {
                word-break: break-all;
                display: inline-block;
                max-width: 100%;
              }
              .contact-actions { 
                background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
                padding: 25px 20px; 
                border-radius: 15px; 
                text-align: center; 
              }
              .contact-actions h3 {
                font-size: 18px;
                margin-bottom: 10px;
                color: #2c3e50;
              }
              .contact-actions p {
                font-size: 14px;
                margin-bottom: 20px;
                color: #6c757d;
              }
              .btn-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 12px;
              }
              .btn { 
                display: inline-block; 
                padding: 14px 24px; 
                border-radius: 50px; 
                text-decoration: none; 
                font-weight: 600; 
                font-size: 15px;
                transition: all 0.3s ease;
                text-align: center;
                min-width: 160px;
              }
              .btn-whatsapp { 
                background: #25D366; 
                color: white; 
              }
              .btn-call { 
                background: #4A90E2; 
                color: white; 
              }
              .btn-email { 
                background: #EA4335; 
                color: white; 
              }
              .btn:hover { 
                transform: translateY(-2px); 
                box-shadow: 0 5px 15px rgba(0,0,0,0.2); 
              }
              .footer { 
                text-align: center; 
                padding: 20px; 
                background: #2c3e50; 
                color: white; 
                font-size: 12px; 
              }
              .highlight { 
                background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%); 
                padding: 20px; 
                border-radius: 15px; 
                text-align: center; 
                margin-bottom: 20px; 
              }
              .highlight h2 {
                font-size: 22px;
                margin-bottom: 8px;
              }
              .highlight p {
                font-size: 15px;
              }
              .extra-info {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 2px dashed #4ECDC4;
              }
              .extra-item {
                background: white;
                padding: 15px;
                border-radius: 10px;
                border: 1px solid #e9ecef;
                word-break: break-word;
                overflow-wrap: break-word;
              }
              .extra-item-row {
                display: flex;
                align-items: flex-start;
                gap: 12px;
              }
              .extra-icon {
                font-size: 28px;
                flex-shrink: 0;
                line-height: 1;
              }
              .extra-content {
                flex: 1;
                min-width: 0;
              }
              .extra-label {
                font-weight: 600;
                color: #6c757d;
                font-size: 13px;
                margin-bottom: 4px;
              }
              .extra-value {
                font-weight: 500;
                color: #2c3e50;
                font-size: 15px;
                line-height: 1.4;
              }
              .badge {
                background: #4ECDC4;
                color: white;
                padding: 4px 12px;
                border-radius: 50px;
                font-size: 13px;
                font-weight: 600;
                display: inline-block;
              }
              
              /* Estilos para escritorio (3 botones en línea) */
              @media (min-width: 769px) {
                .btn-container {
                  flex-direction: row;
                }
                .btn {
                  flex: 0 1 auto;
                }
              }
              
              /* Estilos para móvil (2+1) */
              @media (max-width: 768px) {
                .btn-container {
                  flex-direction: row;
                  flex-wrap: wrap;
                  gap: 12px;
                }
                .btn {
                  flex: 0 1 calc(50% - 6px);
                  min-width: 0;
                  padding: 14px 10px;
                  font-size: 15px;
                }
                .btn:last-child {
                  flex: 0 1 100%;
                }
              }
              
              /* Móviles muy pequeños */
              @media (max-width: 480px) {
                .header h1 { font-size: 24px; }
                .content { padding: 20px 15px; }
                .info-grid { grid-template-columns: 1fr; gap: 10px; }
                .info-section { padding: 15px; }
                .extra-item-row { flex-direction: column; align-items: flex-start; gap: 8px; }
                .extra-icon { font-size: 24px; }
                .highlight h2 { font-size: 20px; }
                
                .btn-container {
                  gap: 10px;
                }
                .btn {
                  padding: 12px 8px;
                  font-size: 14px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1> 🎨 ¡Nueva Inscripción!</h1>
                <p>Taller Paradise - Un nuevo artista se une a nuestra familia</p>
              </div>
              
              <div class="content">
                <div class="highlight">
                  <h2 style="margin: 0; color: #2c3e50;">¡Buenas noticias! 🎉</h2>
                  <p style="margin: 10px 0 0; color: #2c3e50;">Tienes una nueva inscripción esperando por ti</p>
                </div>

                <div class="info-section">
                  <h3> 👶 Información del Pequeño Artista</h3>
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
                  <h3> 👤 Información del Responsable</h3>
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
                      <div class="info-value"><a href="mailto:${email}" style="color: #EA4335; text-decoration: none; word-break: break-all;">${email}</a></div>
                    </div>
                    <div class="info-item">
                      <div class="info-label">Horario Preferido</div>
                      <div class="info-value" style="color: #e74c3c; font-weight: 600;">${horario}</div>
                    </div>
                  </div>
                  
                  <!-- ✅ SECCIÓN ADICIONAL: CÓMO NOS ENCONTRÓ -->
                  ${comoNosEncontro ? `
                  <div class="extra-info">
                    <div class="extra-item">
                      <div class="extra-item-row">
                        <div class="extra-icon">${iconoSeleccionado}</div>
                        <div class="extra-content">
                          <div class="extra-label">📊 ¿Cómo nos encontró?</div>
                          <div><span class="badge">${comoNosEncontro}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ` : ''}
                  
                  <!-- ✅ SECCIÓN ADICIONAL: MENSAJE -->
                  ${mensaje ? `
                  <div class="extra-info">
                    <div class="extra-item">
                      <div class="extra-label" style="margin-bottom: 8px;">💬 Mensaje Adicional</div>
                      <div class="extra-value">${mensaje}</div>
                    </div>
                  </div>
                  ` : ''}
                </div>

                <div class="contact-actions">
                  <h3 style="margin-top: 0; color: #2c3e50;">📞 Contacta al Responsable</h3>
                  <p style="color: #6c757d; margin-bottom: 20px;">Haz clic para contactar</p>
                  
                  <div class="btn-container">
                    <a href="${enlaceWhatsApp}" class="btn btn-whatsapp" target="_blank">
                      💬 WhatsApp
                    </a>
                    <a href="tel:${telefono}" class="btn btn-call">
                      📞 Llamar
                    </a>
                    <a href="mailto:${email}" class="btn btn-email">
                      📧 Mail
                    </a>
                  </div>
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
        `
      }

      await transporter.sendMail(mailOptions)
      emailEnviado = true
      console.log('✅ Email enviado correctamente a la dueña')
    } catch (emailError) {
      console.log('❌ Error enviando email a la dueña:', emailError.message)
    }

    // 2. ENVIAR WHATSAPP A LA DUEÑA (ACTUALIZADO CON COMO NOS ENCONTRO)
    try {
      // ✅ MAPA DE ICONOS PARA WHATSAPP
      const iconosWhatsApp = {
        'Instagram': '📸',
        'Facebook': '📘',
        'Google': '🔍',
        'Recomendación': '💬',
        'WhatsApp': '📱',
        'Volante': '📄',
        'Otro': '✨'
      }
      
      const iconoWA = iconosWhatsApp[comoNosEncontro] || '🔍'
      const referenciaTexto = comoNosEncontro ? `${iconoWA} Nos encontró por: ${comoNosEncontro}` : ''
      
      const mensajeWhatsApp = `🧑‍🎨 NUEVA INSCRIPCIÓN - Taller Paradise

👶 Niño/a: ${nombreNino}
🎂 Edad: ${edad} años
👤 Responsable: ${nombreAdulto}
📞 Teléfono: ${telefono}
📧 Email: ${email}
🕒 Horario: ${horario}
${referenciaTexto ? `📊 ${referenciaTexto}` : ''}
${mensaje ? `💬 Mensaje: ${mensaje}` : ''}

¡Contacta al responsable lo antes posible! 🎨`

      await twilioClient.messages.create({
        body: mensajeWhatsApp,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
        to: `whatsapp:${process.env.NUMERO_DUENA_WHATSAPP}`
      })

      whatsappEnviado = true
      console.log('✅ WhatsApp enviado correctamente a la dueña')
      
    } catch (whatsappError) {
      console.log('❌ Error enviando WhatsApp a la dueña:', whatsappError.message)
    }

    // ✅ DEVOLVEMOS EL NUEVO CAMPO EN LA RESPUESTA
    res.json({ 
      success: true, 
      message: 'Inscripción enviada correctamente. La dueña del taller te contactará pronto.',
      notifications: {
        email: emailEnviado,
        whatsapp: whatsappEnviado
      },
      // ✅ INCLUIMOS EL DATO EN LA RESPUESTA
      data: {
        comoNosEncontro: comoNosEncontro || null
      }
    })

  } catch (error) {
    console.error('💥 Error en el endpoint de inscripción:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

// ============================
// ENDPOINTS DE RECUERDOS CON MONGODB
// ============================

// GET - Obtener todos los recuerdos (público)
app.get('/api/recuerdos', async (req, res) => {
  try {
    const { pagina = 1, limite = 12, tipo, destacado } = req.query;
    
    // Construir filtro
    const filtro = {};
    if (tipo && tipo !== 'todos') filtro.tipo = tipo;
    if (destacado === 'true') filtro.destacado = true;
    
    const recuerdos = await Recuerdo.find(filtro)
      .sort({ fecha: -1 })
      .limit(limite * 1)
      .skip((pagina - 1) * limite);
    
    const total = await Recuerdo.countDocuments(filtro);
    
    res.json({ 
      success: true, 
      recuerdos,
      paginacion: {
        pagina: parseInt(pagina),
        totalPaginas: Math.ceil(total / limite),
        totalRecuerdos: total,
        tieneSiguiente: pagina < Math.ceil(total / limite),
        tieneAnterior: pagina > 1
      }
    });
  } catch (error) {
    console.error('Error obteniendo recuerdos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

// GET - Obtener un recuerdo específico (público)
app.get('/api/recuerdos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validar que el ID no sea "undefined" o inválido
    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de recuerdo inválido' 
      });
    }

    const recuerdo = await Recuerdo.findById(id);
    
    if (!recuerdo) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recuerdo no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      recuerdo 
    });
  } catch (error) {
    console.error('Error obteniendo recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
});

// POST - Crear nuevo recuerdo (PROTEGIDO)
app.post('/api/recuerdos', authenticateAdmin, async (req, res) => {
  try {
    const { titulo, descripcion, fecha, tipo, fotoPortada, galeria = [], destacado = false } = req.body;

    // Validar campos requeridos
    if (!titulo || !descripcion || !fecha || !fotoPortada) {
      return res.status(400).json({ 
        success: false, 
        message: 'Título, descripción, fecha y foto de portada son requeridos' 
      });
    }

    console.log('📸 Creando recuerdo:', {
      titulo,
      fotoPortada: fotoPortada ? 'Sí' : 'No',
      cantidadGaleria: galeria.length
    });

    // Crear el recuerdo en MongoDB
    const nuevoRecuerdo = new Recuerdo({
      titulo,
      descripcion,
      fecha: new Date(fecha),
      tipo: tipo || 'taller',
      fotoPortada,
      galeria: galeria.map(item => ({
        url: item.url,
        tipo: item.tipo || 'imagen',
        descripcion: item.descripcion || ''
      })),
      destacado: Boolean(destacado)
    });

    const recuerdoGuardado = await nuevoRecuerdo.save();

    console.log('✅ Recuerdo creado en MongoDB:', recuerdoGuardado._id);

    res.status(201).json({ 
      success: true, 
      message: 'Recuerdo creado correctamente',
      recuerdo: recuerdoGuardado 
    });

  } catch (error) {
    console.error('❌ Error creando recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al crear el recuerdo' 
    });
  }
});

// PUT - Actualizar recuerdo existente (PROTEGIDO)
app.put('/api/recuerdos/:id', authenticateAdmin, async (req, res) => {
  try {
    const { titulo, descripcion, fecha, tipo, fotoPortada, galeria, destacado } = req.body;

    const recuerdoActualizado = await Recuerdo.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        descripcion,
        fecha: fecha ? new Date(fecha) : undefined,
        tipo,
        fotoPortada,
        galeria: galeria ? galeria.map(item => ({
          url: item.url,
          tipo: item.tipo || 'imagen',
          descripcion: item.descripcion || ''
        })) : undefined,
        destacado
      },
      { new: true, runValidators: true }
    );

    if (!recuerdoActualizado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recuerdo no encontrado' 
      });
    }

    console.log('✅ Recuerdo actualizado en MongoDB:', recuerdoActualizado._id);

    res.json({ 
      success: true, 
      message: 'Recuerdo actualizado correctamente',
      recuerdo: recuerdoActualizado
    });

  } catch (error) {
    console.error('Error actualizando recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al actualizar el recuerdo' 
    });
  }
});

// DELETE - Eliminar recuerdo (PROTEGIDO)
app.delete('/api/recuerdos/:id', authenticateAdmin, async (req, res) => {
  try {
    const recuerdoEliminado = await Recuerdo.findByIdAndDelete(req.params.id);
    
    if (!recuerdoEliminado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recuerdo no encontrado' 
      });
    }

    console.log('✅ Recuerdo eliminado de MongoDB:', recuerdoEliminado.id);

    res.json({ 
      success: true, 
      message: 'Recuerdo eliminado correctamente',
      recuerdo: recuerdoEliminado
    });

  } catch (error) {
    console.error('Error eliminando recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al eliminar el recuerdo' 
    });
  }
});

// Endpoint para subir imágenes a Cloudinary (PROTEGIDO)
app.post('/api/upload-image', authenticateAdmin, async (req, res) => {
  try {
    const { image, resourceType = 'auto' } = req.body;

    console.log('📤 Recibiendo solicitud de upload:', {
      tieneImagen: !!image,
      resourceType: resourceType,
      longitudBase64: image ? image.length : 0
    });

    if (!image) {
      return res.status(400).json({ 
        success: false, 
        message: 'No se proporcionó ningún archivo en formato base64' 
      });
    }

    // Validar que sea un string base64 válido
    if (typeof image !== 'string' || image.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Formato de archivo inválido. Se esperaba un string base64.' 
      });
    }

    console.log('☁️ Subiendo a Cloudinary...');

    try {
      // Subir a Cloudinary
      const result = await cloudinary.v2.uploader.upload(`data:${resourceType === 'video' ? 'video/mp4' : 'image/jpeg'};base64,${image}`, {
        folder: 'taller-paradise/recuerdos',
        resource_type: resourceType,
        quality: 'auto',
        fetch_format: 'auto'
      });

      console.log('✅ Archivo subido a Cloudinary:', {
        url: result.secure_url,
        type: result.resource_type,
        publicId: result.public_id,
        tamaño: result.bytes ? (result.bytes / 1024 / 1024).toFixed(2) + 'MB' : 'N/A'
      });

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
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('💥 Error global:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Error interno del servidor' 
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint no encontrado' 
  });
});

app.listen(PORT, () => {
  console.log('🚀 ========================================')
  console.log(`✅ Servidor backend funcionando - Puerto ${PORT}`)
  console.log(`🗄️  Base de datos: MONGODB (PERSISTENTE)`)
  console.log(`🔐 Autenticación admin: ACTIVA`)
  console.log(`☁️  Cloudinary: CONFIGURADO`)
  console.log(`📧 Notificaciones email: ${process.env.EMAIL_USER ? 'ACTIVAS' : 'INACTIVAS'}`)
  console.log(`📱 Notificaciones WhatsApp: ${process.env.TWILIO_SID ? 'ACTIVAS' : 'INACTIVAS'}`)
  console.log(`🌐 CORS configurado para producción`)
  console.log(`📝 Endpoints CRUD completos`)
  console.log(`📊 Campo "Cómo nos encontraste" AGREGADO a inscripciones`)
  console.log('🚀 ========================================')
});

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