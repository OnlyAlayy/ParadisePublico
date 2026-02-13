import React from 'react'
import { motion } from 'framer-motion'

const GalleryItem = ({ index, image, title, ...props }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1, 
      ease: "easeOut" 
    }}
    whileHover={{ 
      scale: 1.08,
      y: -8,
      rotate: index % 2 === 0 ? -2 : 2,
      transition: { duration: 0.3, ease: "easeOut" }
    }}
    className="relative rounded-2xl overflow-hidden shadow-lg bg-white/90 backdrop-blur-sm border border-gray-200/70 hover:border-watercolor-purple/50 transition-all duration-400 group cursor-pointer"
    style={{
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)"
    }}
    {...props}
  >
    {/* Contenido principal - Ahora con imagen */}
    <div className="aspect-square relative overflow-hidden">
      {/* Imagen principal */}
      <motion.img
        src={image}
        alt={title || `Obra de arte ${index + 1}`}
        className="w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Overlay sutil al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Efecto de brillo al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
      
      {/* Filtro de color sutil según el índice */}
      <div className={`absolute inset-0 mix-blend-overlay opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
        index % 3 === 0 ? 'bg-watercolor-blue' : 
        index % 3 === 1 ? 'bg-watercolor-purple' : 
        'bg-watercolor-pink'
      }`} />
      
      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full opacity-0 group-hover:opacity-40 ${
              index % 3 === 0 ? 'bg-watercolor-blue' : 
              index % 3 === 1 ? 'bg-watercolor-purple' : 
              'bg-watercolor-pink'
            }`}
            initial={{ 
              scale: 0,
              x: Math.random() * 60 - 30,
              y: Math.random() * 60 - 30
            }}
            whileHover={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              delay: Math.random() * 0.5,
            }}
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
            }}
          />
        ))}
      </div>
      
      {/* MARCO INTERIOR ELIMINADO - Este era el problema */}
    </div>

    {/* Etiqueta inferior sutil - AHORA SIEMPRE VISIBLE CON HOVER */}
    <motion.div 
      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-lg z-10 group-hover:bg-white/95 group-hover:scale-105 transition-all duration-300"
    >
      <span className={`text-sm font-medium ${
        index % 3 === 0 ? 'text-watercolor-blue' : 
        index % 3 === 1 ? 'text-watercolor-purple' : 
        'text-watercolor-pink'
      }`}>
        {`Obra ${index + 1}`}
      </span>
    </motion.div>
  </motion.div>
)

export default GalleryItem