import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RealisticBrushStrokes from '../components/ui/RealisticBrushStrokes';

import clock from '../assets/svgs/time-svgrepo-com.svg'
import clothes from '../assets/svgs/clothes-shirt-svgrepo-com.svg'
import paintpalette from  '../assets/svgs/paint-palette-art-svgrepo-com.svg'
import sandclock from '../assets/svgs/sand-clock-svgrepo-com.svg'
import stars from '../assets/svgs/stars-shine-svgrepo-com.svg'
import payment from '../assets/svgs/payment-method-credit-card-svgrepo-com.svg' 
import nomoney from '../assets/svgs/no-money-poverty-budget-poor-cash-svgrepo-com.svg'


// === SVG Icons === //
const MapMarkerIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.25.56-1.24 1.1-1.7 1.12-.47.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.04-1.22.62-1.7.88-1.98.26-.28.51-.35.72-.35h.47c.15 0 .36.06.65.45l.69 1.87c.06.13.1.28.02.45l-.27.41-.39.42c-.12.12-.12.16-.08.31.24.74 1.74 3.06 4.46 4.06.25.1.4.07.55-.05.15-.12.65-.72.82-1 .17-.28.34-.23.55-.15.21.1 1.33.62 1.56.73.23.11.39.17.45.3.06.13.06.74-.2 1.38zM12 2a10 10 0 0 0-8.84 14.64l-1.16 3.4 3.48-1.16A10 10 0 1 0 12 2z" />
  </svg>
);

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm8.6 2H7.6A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zm.85 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

// === Componente Principal Optimizado === //
const Contacto = () => {
  const [copiedText, setCopiedText] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Datos optimizados - CORREGIDO el item de Horarios
  const contactInfo = [
    {
      id: 1,
      icon: <WhatsAppIcon className="w-6 h-6 text-green-500" />,
      title: "WhatsApp",
      content: "11 2754 2411",
      description: "Escribinos para consultas o inscripciones",
      action: () => window.open("https://wa.me/541127542411", "_blank"),
      buttonText: "Escribir por WhatsApp",
      external: true
    },
    {
      id: 2,
      icon: <InstagramIcon className="w-6 h-6 text-pink-500" />,
      title: "Instagram",
      content: "@taller_paradise",
      description: "Seguinos para ver los trabajos de nuestros artistas",
      action: () => window.open("https://instagram.com/taller_paradise", "_blank"),
      buttonText: "Seguir en Instagram",
      external: true
    },
    {
      id: 3,
      icon: <img src={clock} alt="Horario" className="w-6 h-6 text-purple-500" />,
      title: "Horarios",
      content: "Viernes: 15-17h\nSábados: 9-11h y 15-17h",
      description: "Turnos disponibles para todas las edades",
      buttonText: "Reservar turno",
      internalLink: "/inscripcion",
      external: false
    },
  ];

  const importantInfo = [
    {
      icon: <img src={nomoney} alt="Horario" className="w-5 h-5 text-purple-500" />,
      text: "Primera clase GRATIS – Ven a probar sin compromiso",
      highlight: true
    },
    {
      icon: <img src={payment} alt="Horario" className="w-5 h-5 text-purple-500" />,
      text: "Medios de pago: Efectivo, Mercado Pago o transferencia"
    },
    {
      icon: <img src={sandclock} alt="Horario" className="w-5 h-5 text-purple-500" />,
      text: "Puntualidad: Tolerancia de 10-15 minutos"
    },
    {
      icon: <img src={paintpalette} alt="Horario" className="w-5 h-5 text-purple-500" />,
      text: "Trae: Materiales propios y trabajos anteriores (opcional)"
    },
    {
      icon: <img src={clothes} alt="Horario" className="w-5 h-5 text-purple-500" />,
      text: "Ropa: Que se pueda manchar (recomendado)"
    }
  ];

  // Animaciones optimizadas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardHover = {
    y: -4,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  };

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Trazos de pincel en el fondo */}
      <RealisticBrushStrokes 
        section="light" 
        intensity="light"
        positions={{
          1: { top: "8%", left: "3%", width: "20rem", height: "10rem" },
          2: { top: "12%", right: "5%", width: "18rem", height: "9rem" },
          3: { top: "65%", left: "6%", width: "16rem", height: "8rem" },
          4: { top: "70%", right: "8%", width: "14rem", height: "7rem" },
          5: { top: "40%", left: "55%", width: "15rem", height: "7rem" },
          6: { top: "80%", right: "15%", width: "12rem", height: "6rem" }
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-8 md:py-12 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/10 relative z-10"
      >
        <div className="container mx-auto px-4">
          {/* Título optimizado */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Contacto <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Paradise</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Estamos aquí para responder todas tus preguntas y ayudarte a comenzar tu viaje artístico
            </p>
          </motion.div>

          {/* Grid Principal Optimizado */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Columna Izquierda - Información de Contacto */}
            <div className="space-y-4 md:space-y-6">
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                 Encuéntranos en nuestras Redes!
              </motion.h2>

              {contactInfo.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={cardHover}
                  className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 md:p-6 border border-gray-100/50"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-base md:text-lg mb-1 truncate">
                        {item.title}
                      </h3>
                      <div className="text-gray-600 mb-1 md:mb-2 whitespace-pre-line text-sm md:text-base">
                        {item.content}
                      </div>
                      <p className="text-gray-500 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {/* BOTÓN CORREGIDO - Ahora usa Link para navegación interna */}
                      {item.external ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={item.action}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm hover:shadow-lg transition-all duration-300 w-full md:w-auto"
                        >
                          {copiedText === item.buttonText ? "✓ Copiado" : item.buttonText}
                        </motion.button>
                      ) : (
                        <Link to={item.internalLink}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm hover:shadow-lg transition-all duration-300 w-full md:w-auto"
                          >
                            {item.buttonText}
                          </motion.button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Columna Derecha - Información Adicional */}
            <div className="space-y-4 md:space-y-6">
              {/* Mapa de Google Maps */}
              <motion.div
                variants={itemVariants}
                whileHover={cardHover}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-100/50"
              >
                <div className="h-64 md:h-72 lg:h-80 w-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3279.4484647697827!2d-58.32476202425475!3d-34.71908857291308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3327f67a4fb3f%3A0x7ba4776ae2a1731c!2sBermejo%203867%2C%20B1876%20Bernal%20Oeste%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1763442298763!5m2!1ses-419!2sar" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }}
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Taller Paradise en Bermejo 3867"
                    className="rounded-t-xl md:rounded-t-2xl"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="font-bold text-gray-800 mb-2 md:mb-3 flex items-center gap-2 text-base md:text-lg">
                    <MapMarkerIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                    Nuestra Ubicación
                  </h3>
                  <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
                    Nos encontramos en <strong>Bermejo 3867, Bernal Oeste</strong>. 
                    Fácil acceso por transporte público.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open("https://maps.google.com/?q=Bermejo+3867", "_blank")}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span className="text-base"></span>
                    Abrir en Google Maps
                  </motion.button>
                </div>
              </motion.div>

              {/* Información Importante */}
              <motion.div
                variants={itemVariants}
                whileHover={cardHover}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100/50"
              >
                <h3 className="font-bold text-gray-800 mb-3 md:mb-4 text-lg md:text-xl flex items-center gap-2">
                 <img src={stars} alt="Horario" className="w-6 h-6 text-purple-500" />
                  Información Importante
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {importantInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={`flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-lg text-xs md:text-sm ${
                        info.highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      {info.icon}
                      <span className={`${info.highlight ? 'text-green-800 font-semibold' : 'text-gray-700'}`}>
                        {info.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mensaje Final Optimizado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 md:mt-16 max-w-2xl mx-auto"
          >
            <p className="text-gray-600 text-base md:text-lg">
              ¿Tienes dudas sobre horarios, precios o materiales? No dudes en contactarnos, 
              estamos aquí para ayudarte a comenzar tu aventura artística.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contacto;