// src/pages/Recuerdos.jsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import PaintBrushCursor from '../components/ui/PaintBrushCursor';
import RealisticBrushStrokes from '../components/ui/RealisticBrushStrokes';

// Componentes SVG mejorados con estilo watercolor y colores vibrantes
const SvgIcons = {
  calendar: ({ className = "w-5 h-5", color = "text-watercolor-blue" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  filter: ({ className = "w-5 h-5", color = "text-watercolor-purple" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  camera: ({ className = "w-5 h-5", color = "text-gray-500" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  star: ({ className = "w-4 h-4", color = "text-watercolor-yellow" }) => (
    <svg className={`${className} ${color}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  arrowRight: ({ className = "w-4 h-4", color = "text-watercolor-blue" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ),
  palette: ({ className = "w-6 h-6", color = "text-watercolor-blue" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  gallery: ({ className = "w-6 h-6", color = "text-watercolor-purple" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  celebration: ({ className = "w-6 h-6", color = "text-watercolor-pink" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  book: ({ className = "w-6 h-6", color = "text-watercolor-green" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  default: ({ className = "w-6 h-6", color = "text-watercolor-blue" }) => (
    <svg className={`${className} ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
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

// Componente personalizado para selects con mejor UX
const CustomSelect = ({ 
  value, 
  onChange, 
  options, 
  icon: Icon, 
  label, 
  iconColor = "text-watercolor-blue",
  className = "" 
}) => (
  <div className="space-y-3 relative">
    <label className="flex items-center text-lg font-semibold text-gray-800">
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="mr-3"
      >
        <Icon color={iconColor} />
      </motion.div>
      {label}
    </label>
    
    {/* Select personalizado */}
    <div className="relative group">
      <select
        value={value}
        onChange={onChange}
        className={`
          w-full p-4 pr-12 border-2 border-gray-200 rounded-2xl 
          focus:ring-4 focus:ring-watercolor-blue/20 focus:border-watercolor-blue 
          bg-white/80 backdrop-blur-sm transition-all duration-300 
          text-base font-medium appearance-none cursor-pointer
          hover:border-watercolor-blue/50 hover:shadow-lg
          group-hover:shadow-xl group-hover:scale-[1.02]
          ${className}
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: 'right 1rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1.5em 1.5em'
        }}
      >
        {options.map(option => (
          <option key={option.valor} value={option.valor}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
    </div>
  </div>
);

const Recuerdos = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
  const [recuerdos, setRecuerdos] = useState([]);
  const [filtroMes, setFiltroMes] = useState('');
  const [filtroAño, setFiltroAño] = useState(new Date().getFullYear());
  const [cargando, setCargando] = useState(true);
  const [cargandoFiltros, setCargandoFiltros] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState('');

  // Carga inicial
  useEffect(() => {
    cargarRecuerdos();
  }, []);

  // Carga con filtros - sin recargar toda la página
  useEffect(() => {
    if (!cargando) { // Solo ejecutar después de la carga inicial
      cargarRecuerdosConFiltros();
    }
  }, [filtroMes, filtroAño, filtroTipo]);

  const cargarRecuerdos = async () => {
    try {
      setCargando(true);
      const response = await fetch(`${BACKEND_URL}/api/recuerdos`);
      const result = await response.json();
      
      if (result.success) {
        setRecuerdos(result.recuerdos);
      }
    } catch (error) {
      console.error('Error cargando recuerdos:', error);
    } finally {
      setCargando(false);
    }
  };

  const cargarRecuerdosConFiltros = async () => {
    try {
      setCargandoFiltros(true);
      const params = new URLSearchParams();
      if (filtroMes) params.append('mes', filtroMes);
      if (filtroAño) params.append('año', filtroAño);
      if (filtroTipo) params.append('tipo', filtroTipo);

      const response = await fetch(`${BACKEND_URL}/api/recuerdos?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setRecuerdos(result.recuerdos);
      }
    } catch (error) {
      console.error('Error cargando recuerdos:', error);
    } finally {
      setCargandoFiltros(false);
    }
  };

  const meses = [
    { valor: '', label: 'Todos los meses' },
    { valor: '1', label: 'Enero' }, { valor: '2', label: 'Febrero' },
    { valor: '3', label: 'Marzo' }, { valor: '4', label: 'Abril' },
    { valor: '5', label: 'Mayo' }, { valor: '6', label: 'Junio' },
    { valor: '7', label: 'Julio' }, { valor: '8', label: 'Agosto' },
    { valor: '9', label: 'Septiembre' }, { valor: '10', label: 'Octubre' },
    { valor: '11', label: 'Noviembre' }, { valor: '12', label: 'Diciembre' }
  ];

  const años = [2023, 2024, 2025];
  const tipos = [
    { valor: '', label: 'Todos los tipos' },
    { valor: 'taller', label: 'Talleres' },
    { valor: 'exposicion', label: 'Exposiciones' },
    { valor: 'evento', label: 'Eventos' },
    { valor: 'clase', label: 'Clases' }
  ];

  // Función para obtener color según el tipo de evento
  const getColorByType = (tipo) => {
    const colors = {
      taller: 'from-watercolor-blue/15 to-watercolor-purple/15',
      exposicion: 'from-watercolor-purple/15 to-watercolor-pink/15',
      evento: 'from-watercolor-pink/15 to-watercolor-orange/15',
      clase: 'from-watercolor-green/15 to-watercolor-blue/15',
      default: 'from-watercolor-blue/15 to-watercolor-green/15'
    };
    return colors[tipo] || colors.default;
  };

  const getBorderColorByType = (tipo) => {
    const colors = {
      taller: 'border-watercolor-blue/20',
      exposicion: 'border-watercolor-purple/20',
      evento: 'border-watercolor-pink/20',
      clase: 'border-watercolor-green/20',
      default: 'border-watercolor-blue/20'
    };
    return colors[tipo] || colors.default;
  };

  // Función para obtener ícono SVG según el tipo
  const getIconByType = (tipo) => {
    const icons = {
      taller: SvgIcons.palette,
      exposicion: SvgIcons.gallery,
      evento: SvgIcons.celebration,
      clase: SvgIcons.book,
      default: SvgIcons.default
    };
    return icons[tipo] || icons.default;
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

  // Calcular total de elementos multimedia
  const getTotalElementos = (recuerdo) => {
    const galeriaCount = recuerdo.galeria ? recuerdo.galeria.length : 0;
    return galeriaCount + 1; // +1 por la fotoPortada
  };

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
            Cargando recuerdos mágicos...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 bg-gradient-to-br from-watercolor-blue/5 via-watercolor-purple/5 to-watercolor-pink/5 relative overflow-hidden"
    >
      {/* Cursor personalizado de pincel */}
      <PaintBrushCursor />

      {/* Brush strokes de fondo mejorados */}
      <RealisticBrushStrokes 
        section="gallery" 
        intensity="medium"
        positions={{
          1: { top: "5%", left: "3%", width: "28rem", height: "14rem" },
          2: { top: "12%", right: "4%", width: "24rem", height: "11rem" },
          3: { bottom: "15%", left: "8%", width: "22rem", height: "10rem" },
          4: { bottom: "8%", right: "10%", width: "20rem", height: "9rem" },
          5: { top: "45%", left: "50%", width: "18rem", height: "8rem" },
          6: { top: "65%", left: "5%", width: "24rem", height: "11rem" },
          7: { top: "8%", right: "20%", width: "20rem", height: "9rem" },
        }}
      />

      {/* Fondo decorativo adicional con elementos de pinceladas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-watercolor-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-watercolor-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-watercolor-purple/10 rounded-full blur-3xl"></div>
        
        {/* Pinceladas decorativas adicionales animadas */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-40 h-40 opacity-15"
        >
          <div className="w-full h-full bg-watercolor-blue rounded-full blur-xl"></div>
        </motion.div>
        
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-32 left-32 w-32 h-32 opacity-15"
        >
          <div className="w-full h-full bg-watercolor-purple rounded-full blur-xl"></div>
        </motion.div>

        <motion.div
          animate={{
            y: [10, -10, 10],
            rotate: [10, -10, 10],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/3 right-1/4 w-24 h-24 opacity-10"
        >
          <div className="w-full h-full bg-watercolor-pink rounded-full blur-lg"></div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimationWrapper>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-watercolor-blue via-watercolor-purple to-watercolor-pink bg-clip-text text-transparent mb-6"
            >
              Nuestros Recuerdos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            >
              Descubre los momentos mágicos que vivimos juntos en Taller Paradise
            </motion.p>
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Filtros mejorados con selects personalizados */}
        <ScrollAnimationWrapper delay={0.1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto mb-12 bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50 relative overflow-hidden"
          >
            {/* Efecto de fondo en los filtros */}
            <div className="absolute inset-0 bg-gradient-to-br from-watercolor-blue/5 via-watercolor-purple/5 to-watercolor-pink/5 rounded-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Filtro por mes */}
              <CustomSelect
                value={filtroMes}
                onChange={(e) => setFiltroMes(e.target.value)}
                options={meses}
                icon={SvgIcons.calendar}
                label="Filtrar por mes"
                iconColor="text-watercolor-blue"
                className="focus:ring-watercolor-blue/20 focus:border-watercolor-blue"
              />

              {/* Filtro por año */}
              <CustomSelect
                value={filtroAño}
                onChange={(e) => setFiltroAño(e.target.value)}
                options={años.map(año => ({ valor: año, label: año.toString() }))}
                icon={SvgIcons.filter}
                label="Filtrar por año"
                iconColor="text-watercolor-purple"
                className="focus:ring-watercolor-purple/20 focus:border-watercolor-purple"
              />

              {/* Filtro por tipo */}
              <CustomSelect
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                options={tipos}
                icon={SvgIcons.palette}
                label="Filtrar por tipo"
                iconColor="text-watercolor-pink"
                className="focus:ring-watercolor-pink/20 focus:border-watercolor-pink"
              />
            </div>

            {/* Botón de reset opcional */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative z-10 flex justify-center mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFiltroMes('');
                  setFiltroAño(new Date().getFullYear());
                  setFiltroTipo('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-watercolor-blue to-watercolor-purple text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <SvgIcons.filter color="text-white" />
                Reiniciar filtros
              </motion.button>
            </motion.div>
          </motion.div>
        </ScrollAnimationWrapper>

        {/* Galería de Recuerdos - Con Mejoras UX y animaciones de scroll */}
        <div className="max-w-6xl mx-auto relative">
          {/* Overlay de carga para filtros */}
          {cargandoFiltros && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl z-20 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-watercolor-blue border-t-transparent rounded-full"
              />
            </motion.div>
          )}

          {recuerdos.length === 0 ? (
            <ScrollAnimationWrapper>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 4, -4, 0],
                    scale: [1, 1.06, 1]
                  }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                  className="w-32 h-32 mx-auto mb-6 text-gray-400"
                >
                  <SvgIcons.camera className="w-full h-full" />
                </motion.div>

                <motion.h3
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-3xl font-bold bg-gradient-to-r from-watercolor-blue to-watercolor-purple bg-clip-text text-transparent mb-3"
                >
                  ¡Próximamente más recuerdos!
                </motion.h3>

                <motion.p
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-gray-600 text-lg mb-4 max-w-md mx-auto leading-relaxed"
                >
                  Muy pronto verás aquí los momentos especiales que compartimos contigo.
                </motion.p>
              </motion.div>
            </ScrollAnimationWrapper>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {recuerdos.map((recuerdo, index) => {
                const IconComponent = getIconByType(recuerdo.tipo);
                const iconColor = getIconColorByType(recuerdo.tipo);
                const borderColor = getBorderColorByType(recuerdo.tipo);
                const totalElementos = getTotalElementos(recuerdo);

                return (
                  <ScrollAnimationWrapper key={recuerdo._id} delay={index * 0.05}>
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.45,
                        ease: "easeOut"
                      }}
                      whileHover={{
                        scale: 1.04,
                        y: -8,
                        rotate: 0.5,
                        transition: { 
                          duration: 0.3, 
                          ease: "easeOut",
                          type: "spring",
                          stiffness: 300
                        }
                      }}
                      className="group cursor-pointer"
                    >
                      <Link to={`/recuerdos/${recuerdo._id}`} className="block h-full">
                        <div
                          className={`bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/60 group-hover:border-watercolor-blue/50 h-full flex flex-col overflow-hidden relative`}
                        >
                          {/* Efecto de ripple sutil al hacer hover */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-watercolor-blue/0 via-watercolor-purple/0 to-watercolor-pink/0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10"></div>
                          
                          {/* Header */}
                          <div className={`relative h-60 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200`}>
                            
                            {recuerdo.fotoPortada ? (
                              <>
                                <img
                                  src={recuerdo.fotoPortada}
                                  alt={recuerdo.titulo}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/15 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500"></div>
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-watercolor-blue/10 to-watercolor-purple/10">
                                <div className={`${iconColor} opacity-60`}>
                                  <IconComponent className="w-12 h-12" />
                                </div>
                              </div>
                            )}

                            {/* Badges - Mejor separación visual */}
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                              {/* Badge destacado */}
                              {recuerdo.destacado && (
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  className="bg-gradient-to-r from-watercolor-yellow to-watercolor-orange text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 backdrop-blur-sm border border-yellow-300/30"
                                >
                                  <SvgIcons.star className="w-3 h-3" />
                                  <span>Destacado</span>
                                </motion.div>
                              )}
                              
                              {/* Badge tipo */}
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/95 backdrop-blur-lg rounded-full px-4 py-2 text-xs font-semibold text-gray-800 capitalize shadow-lg border border-white/60 flex items-center gap-1.5"
                              >
                                <IconComponent className={`w-3.5 h-3.5 ${iconColor}`} />
                                <span className="capitalize">{recuerdo.tipo}</span>
                              </motion.div>
                            </div>

                            {/* Contador - Centrado y mejor integrado */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-black/60 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2 text-white/95 text-xs border border-white/20 shadow-xl"
                              >
                                <SvgIcons.camera className="w-3.5 h-3.5 text-gray-300" />
                                <span className="font-semibold">{totalElementos} {totalElementos === 1 ? 'elemento' : 'elementos'}</span>
                              </motion.div>
                            </div>
                          </div>

                          {/* Contenido */}
                          <div className="p-5 flex-1 flex flex-col">
                            {/* Título */}
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-watercolor-blue transition-colors duration-300 flex-1 pr-3 leading-tight">
                                {recuerdo.titulo}
                              </h3>

                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`${iconColor} flex-shrink-0 mt-0.5`}
                              >
                                <IconComponent className="w-5 h-5" />
                              </motion.div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
                              {recuerdo.descripcion}
                            </p>

                            {/* Fecha - Formato editorial mejorado */}
                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 bg-gray-50/50 rounded-xl p-3 border border-gray-200/40">
                              <SvgIcons.calendar className="w-4 h-4 text-watercolor-blue flex-shrink-0" />
                              <span className="font-medium">
                                {new Date(recuerdo.fecha).toLocaleDateString("es-AR", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }).replace(/^(\d+)\s(\w+)\s(\d+)$/, '$1 de $2 $3')}
                              </span>
                            </div>

                            {/* CTA - Más clickeable y con mejor feedback */}
                            <div className="pt-3 border-t border-gray-200/40 mt-auto">
                              <motion.div
                                whileHover={{ x: 2 }}
                                className="flex items-center justify-between text-watercolor-blue font-semibold group-hover:text-watercolor-purple transition-colors duration-300 text-sm"
                              >
                                <span className="relative">
                                  Ver detalles
                                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-watercolor-blue group-hover:w-full transition-all duration-300 ease-out"></span>
                                </span>
                                <motion.div
                                  animate={{ x: [0, 2, 0] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                  className="group-hover:translate-x-1 transition-transform duration-300"
                                >
                                  <SvgIcons.arrowRight className="w-4 h-4" />
                                </motion.div>
                              </motion.div>
                            </div>
                          </div>

                          {/* Efecto de brillo al hacer hover */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </div>
                      </Link>
                    </motion.div>
                  </ScrollAnimationWrapper>
                );
              })}
            </div>
          )}
        </div>

        {/* Mensaje informativo mejorado con animación de scroll */}
        <ScrollAnimationWrapper delay={0.2}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="max-w-4xl mx-auto mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-watercolor-blue/10 to-watercolor-purple/10 rounded-3xl p-8 border border-watercolor-blue/20 shadow-xl backdrop-blur-sm relative overflow-hidden">
              {/* Efecto de fondo sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-watercolor-blue/5 via-watercolor-purple/5 to-watercolor-pink/5 rounded-3xl"></div>
              <div className="relative z-10">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Estos son algunos de los momentos especiales que hemos vivido en nuestro taller.
                  ¡Seguiremos creando aventuras artísticas y recuerdos inolvidables!
                </p>
              </div>
            </div>
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </motion.div>
  );
};

export default Recuerdos;