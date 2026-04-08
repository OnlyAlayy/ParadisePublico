import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { configureCloudinary } from './config/cloudinary.js';

// Import Rutas
import inscripcionRoutes from './routes/inscripcionRoutes.js';
import recuerdosRoutes from './routes/recuerdosRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import authRoutes from './routes/authRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuraciones externas
configureCloudinary();
connectDB();

// Middlewares
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
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Rutas de la API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend de Taller Paradise funcionando correctamente (MVC)',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.use('/api/inscripcion', inscripcionRoutes);
app.use('/api/recuerdos', recuerdosRoutes);
app.use('/api/upload-image', uploadRoutes);
app.use('/api/auth', authRoutes);

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('💥 Error global:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Error interno del servidor' 
  });
});

// Rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint no encontrado' 
  });
});

app.listen(PORT, () => {
  console.log('🚀 ========================================');
  console.log(`✅ Servidor backend funcionando - Puerto ${PORT}`);
  console.log('🚀 ========================================');
});