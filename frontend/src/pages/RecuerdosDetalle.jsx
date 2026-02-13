// src/pages/RecuerdoDetalle.jsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PaintBrushCursor from '../components/ui/PaintBrushCursor';
import RealisticBrushStrokes from '../components/ui/RealisticBrushStrokes';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon
} from 'react-share';

// Componentes SVG mejorados con colores consistentes
const SvgIcons = {
  arrowLeft: ({ className = "w-5 h-5", color = "text-watercolor-blue" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  arrowRight: ({ className = "w-6 h-6", color = "text-watercolor-blue" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  arrowLeftCircle: ({ className = "w-8 h-8", color = "text-white" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
    </svg>
  ),
  arrowRightCircle: ({ className = "w-8 h-8", color = "text-white" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  calendar: ({ className = "w-6 h-6", color = "text-watercolor-blue" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  camera: ({ className = "w-6 h-6", color = "text-gray-500" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  palette: ({ className = "w-6 h-6", color = "text-watercolor-purple" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  video: ({ className = "w-5 h-5", color = "text-gray-300" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  image: ({ className = "w-5 h-5", color = "text-gray-300" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  star: ({ className = "w-5 h-5", color = "text-watercolor-yellow" }) => (
    <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  heart: ({ className = "w-5 h-5", color = "text-watercolor-pink" }) => (
    <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  )
};

// Componente para animaciones de scroll
const ScrollAnimationWrapper = ({ children, delay = 0 }) => {
  const { scrollYProgress } = useScroll({
    trigger: true,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        transition: `all 0.6s ease-out ${delay}s`
      }}
    >
      {children}
    </motion.div>
  );
};

const RecuerdoDetalle = () => {
  const BACKEND_URL = 'http://localhost:3001';
  const { id } = useParams();
  const navigate = useNavigate();
  const [recuerdo, setRecuerdo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [imagenActiva, setImagenActiva] = useState(0);

  useEffect(() => {
    const cargarRecuerdo = async () => {
      try {
        if (!id || id === 'undefined') {
          console.error('ID de recuerdo inválido');
          navigate('/recuerdos');
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/recuerdos/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setRecuerdo(result.recuerdo);
        } else {
          console.error('Recuerdo no encontrado:', result.message);
          navigate('/recuerdos');
        }
      } catch (error) {
        console.error('Error cargando recuerdo:', error);
        navigate('/recuerdos');
      } finally {
        setCargando(false);
      }
    };

    cargarRecuerdo();
  }, [id, navigate]);

  const getAllMedia = () => {
    if (!recuerdo) return [];
    
    const media = [];
    
    if (recuerdo.fotoPortada) {
      media.push({
        url: recuerdo.fotoPortada,
        tipo: 'imagen',
        esPortada: true,
        descripcion: 'Foto principal'
      });
    }
    
    if (recuerdo.galeria && recuerdo.galeria.length > 0) {
      recuerdo.galeria.forEach(item => {
        media.push({
          url: item.url,
          tipo: item.tipo || 'imagen',
          descripcion: item.descripcion || '',
          esPortada: false
        });
      });
    }
    
    return media;
  };

  const todasLasImagenes = getAllMedia();

  const siguienteImagen = () => {
    if (todasLasImagenes.length > 0) {
      setImagenActiva((prev) => (prev + 1) % todasLasImagenes.length);
    }
  };

  const anteriorImagen = () => {
    if (todasLasImagenes.length > 0) {
      setImagenActiva((prev) => (prev - 1 + todasLasImagenes.length) % todasLasImagenes.length);
    }
  };

  // Función para obtener color del ícono según el tipo
  const getIconColorByType = (tipo) => {
    const colors = {
      taller: 'text-watercolor-blue',
      exposicion: 'text-watercolor-purple',
      evento: 'text-watercolor-pink',
      clase: 'text-watercolor-green',
      default: 'text-watercolor-blue'
    };
    return colors[tipo] || colors.default;
  };

  // Datos para compartir
  const shareUrl = window.location.href;
  const shareTitle = `Mirá este recuerdo de Taller Paradise: ${recuerdo?.titulo || 'Recuerdo especial'}`;
  const shareHashtags = ['TallerParadise', 'Recuerdos'];

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-watercolor-blue/5 via-watercolor-purple/5 to-watercolor-pink/5">
        <RealisticBrushStrokes section="gallery" intensity="light" />
        <div className="text-center relative z-10">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
            className="w-32 h-32 mx-auto mb-6"
          >
            <SvgIcons.palette className="w-full h-full text-watercolor-blue/60" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-watercolor-purple text-xl font-medium"
          >
            Cargando recuerdo mágico...
          </motion.p>
        </div>
      </div>
    );
  }

  if (!recuerdo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-watercolor-blue/5 via-watercolor-purple/5 to-watercolor-pink/5">
        <RealisticBrushStrokes section="gallery" intensity="light" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative z-10"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Recuerdo no encontrado</h1>
          <Link 
            to="/recuerdos" 
            className="bg-gradient-to-r from-watercolor-blue to-watercolor-purple text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
          >
            <SvgIcons.arrowLeft />
            Volver a Recuerdos
          </Link>
        </motion.div>
      </div>
    );
  }

  const iconColor = getIconColorByType(recuerdo.tipo);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-watercolor-blue/5 via-watercolor-purple/5 to-watercolor-pink/5 relative overflow-hidden"
    >
      {/* Cursor personalizado de pincel */}
      <PaintBrushCursor />

      {/* Brush strokes de fondo */}
      <RealisticBrushStrokes 
        section="gallery" 
        intensity="medium"
        positions={{
          1: { top: "5%", left: "3%", width: "28rem", height: "14rem" },
          2: { top: "12%", right: "4%", width: "24rem", height: "11rem" },
          3: { bottom: "15%", left: "8%", width: "22rem", height: "10rem" },
          4: { bottom: "8%", right: "10%", width: "20rem", height: "9rem" },
          5: { top: "45%", left: "50%", width: "18rem", height: "8rem" },
        }}
      />

      {/* Fondo decorativo adicional */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-watercolor-blue/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-watercolor-pink/8 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-watercolor-purple/8 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <Link 
                to="/recuerdos" 
                className="flex items-center text-watercolor-blue hover:text-watercolor-purple transition-all duration-300 font-semibold group"
              >
                <motion.div
                  whileHover={{ x: -3 }}
                  className="flex items-center gap-2"
                >
                  <SvgIcons.arrowLeft />
                  <span className="group-hover:underline">Volver a Recuerdos</span>
                </motion.div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-600 bg-white/50 px-4 py-2 rounded-full border border-white/40 backdrop-blur-sm"
            >
              {new Date(recuerdo.fecha).toLocaleDateString('es-AR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Encabezado */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-watercolor-blue via-watercolor-purple to-watercolor-pink bg-clip-text text-transparent mb-6"
            >
              {recuerdo.titulo}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
            >
              {recuerdo.descripcion}
            </motion.p>
          </div>

          {/* Galería Principal */}
          {todasLasImagenes.length > 0 && (
            <ScrollAnimationWrapper delay={0.1}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/30 relative group">
                  <div className="relative h-96 md:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200">
                    {todasLasImagenes[imagenActiva]?.tipo === 'video' ? (
                      <video
                        src={todasLasImagenes[imagenActiva].url}
                        controls
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                      >
                        Tu navegador no soporta el elemento video.
                      </video>
                    ) : (
                      <img
                        src={todasLasImagenes[imagenActiva]?.url}
                        alt={`${recuerdo.titulo} - Imagen ${imagenActiva + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    
                    {/* Overlay de gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Controles de navegación */}
                    {todasLasImagenes.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={anteriorImagen}
                          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-2xl p-4 shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                        >
                          <SvgIcons.arrowLeftCircle />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={siguienteImagen}
                          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-2xl p-4 shadow-2xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                        >
                          <SvgIcons.arrowRightCircle />
                        </motion.button>
                      </>
                    )}
                    
                    {/* Badge de tipo */}
                    <div className="absolute top-6 left-6 bg-black/80 text-white px-4 py-2 rounded-2xl text-sm font-medium flex items-center gap-2 backdrop-blur-sm border border-white/20">
                      {todasLasImagenes[imagenActiva]?.tipo === 'video' ? (
                        <>
                          <SvgIcons.video />
                          <span>Video</span>
                        </>
                      ) : (
                        <>
                          <SvgIcons.image />
                          <span>Imagen</span>
                        </>
                      )}
                      {todasLasImagenes[imagenActiva]?.esPortada && (
                        <span className="bg-watercolor-blue px-2 py-1 rounded-full text-xs font-semibold">Principal</span>
                      )}
                    </div>
                    
                    {/* Contador */}
                    {todasLasImagenes.length > 1 && (
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-2xl text-sm font-medium backdrop-blur-sm border border-white/20">
                        {imagenActiva + 1} / {todasLasImagenes.length}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          )}

          {/* Miniaturas */}
          {todasLasImagenes.length > 1 && (
            <ScrollAnimationWrapper delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <div className="flex space-x-4 overflow-x-auto pb-4 px-2 scrollbar-thin scrollbar-thumb-watercolor-blue/20 scrollbar-track-transparent">
                  {todasLasImagenes.map((media, index) => (
                    <motion.button
                      key={`${media.url}-${index}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setImagenActiva(index)}
                      className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300 relative group ${
                        index === imagenActiva 
                          ? 'border-watercolor-blue shadow-2xl scale-105' 
                          : 'border-gray-200/60 hover:border-watercolor-purple hover:shadow-lg'
                      }`}
                    >
                      {media.tipo === 'video' ? (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <SvgIcons.video className="text-gray-400" />
                        </div>
                      ) : (
                        <img
                          src={media.url}
                          alt={`Miniatura ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      {/* Indicador de portada */}
                      {media.esPortada && (
                        <div className="absolute top-1 left-1 bg-watercolor-blue text-white text-xs px-2 py-1 rounded-full font-semibold backdrop-blur-sm">
                          Principal
                        </div>
                      )}
                      {/* Overlay de selección */}
                      {index === imagenActiva && (
                        <div className="absolute inset-0 bg-watercolor-blue/20 border-2 border-watercolor-blue rounded-2xl"></div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
          )}

          {/* Información adicional */}
          <ScrollAnimationWrapper delay={0.3}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30 mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sobre este día especial</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center bg-watercolor-blue/10 rounded-2xl p-6 border border-watercolor-blue/20"
                >
                  <div className="w-14 h-14 bg-watercolor-blue/20 rounded-2xl flex items-center justify-center mr-4 text-watercolor-blue">
                    <SvgIcons.calendar />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-watercolor-blue">Fecha</p>
                    <p className="text-gray-600">{new Date(recuerdo.fecha).toLocaleDateString('es-AR')}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center bg-watercolor-purple/10 rounded-2xl p-6 border border-watercolor-purple/20"
                >
                  <div className="w-14 h-14 bg-watercolor-purple/20 rounded-2xl flex items-center justify-center mr-4 text-watercolor-purple">
                    <SvgIcons.camera />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-watercolor-purple">Elementos multimedia</p>
                    <p className="text-gray-600">{todasLasImagenes.length} momentos capturados</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center bg-watercolor-pink/10 rounded-2xl p-6 border border-watercolor-pink/20"
                >
                  <div className="w-14 h-14 bg-watercolor-pink/20 rounded-2xl flex items-center justify-center mr-4 text-watercolor-pink">
                    <SvgIcons.palette />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-watercolor-pink">Tipo de evento</p>
                    <p className="text-gray-600 capitalize">{recuerdo.tipo || 'Evento especial'}</p>
                  </div>
                </motion.div>
              </div>

              {/* Información de destacado */}
              {recuerdo.destacado && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 p-6 bg-watercolor-yellow/20 border border-watercolor-yellow/30 rounded-2xl flex items-center gap-4 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-watercolor-yellow"
                  >
                    <SvgIcons.star className="w-8 h-8" />
                  </motion.div>
                  <div>
                    <p className="text-watercolor-orange font-semibold text-lg">✨ Este es un recuerdo destacado</p>
                    <p className="text-watercolor-orange/80">Un momento especial que queremos conservar para siempre</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </ScrollAnimationWrapper>

          {/* Compartir - SECCIÓN MEJORADA */}
          <ScrollAnimationWrapper delay={0.4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <p className="text-gray-700 text-lg mb-6">¿Te gustó este recuerdo? Compártelo</p>
              <div className="flex justify-center space-x-3 flex-wrap gap-4">
                {/* Facebook */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FacebookShareButton
                    url={shareUrl}
                    quote={shareTitle}
                    hashtag="#TallerParadise"
                    className="flex flex-col items-center"
                  >
                    <FacebookIcon 
                      size={50} 
                      round 
                      className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    />
                    <span className="text-xs mt-2 text-gray-600 font-medium">Facebook</span>
                  </FacebookShareButton>
                </motion.div>

                {/* Twitter */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <TwitterShareButton
                    url={shareUrl}
                    title={shareTitle}
                    hashtags={shareHashtags}
                    className="flex flex-col items-center"
                  >
                    <TwitterIcon 
                      size={50} 
                      round 
                      className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    />
                    <span className="text-xs mt-2 text-gray-600 font-medium">Twitter</span>
                  </TwitterShareButton>
                </motion.div>

                {/* WhatsApp */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <WhatsappShareButton
                    url={shareUrl}
                    title={shareTitle}
                    separator=" - "
                    className="flex flex-col items-center"
                  >
                    <WhatsappIcon 
                      size={50} 
                      round 
                      className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    />
                    <span className="text-xs mt-2 text-gray-600 font-medium">WhatsApp</span>
                  </WhatsappShareButton>
                </motion.div>

                {/* Telegram */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <TelegramShareButton
                    url={shareUrl}
                    title={shareTitle}
                    className="flex flex-col items-center"
                  >
                    <TelegramIcon 
                      size={50} 
                      round 
                      className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    />
                    <span className="text-xs mt-2 text-gray-600 font-medium">Telegram</span>
                  </TelegramShareButton>
                </motion.div>
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecuerdoDetalle;