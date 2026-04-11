import React from 'react'
import { motion } from 'framer-motion'

const GalleryItem = ({ index, image, title, isMobile, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ 
      duration: 0.45, 
      delay: index * 0.06, 
      ease: [0.25, 0.46, 0.45, 0.94]
    }}
    whileHover={!isMobile ? { 
      y: -6,
      transition: { duration: 0.25, ease: "easeOut" }
    } : {}}
    className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl bg-white border border-gray-200/50 hover:border-watercolor-purple/30 transition-shadow duration-400 group cursor-pointer"
    {...props}
  >
    <div className="aspect-square relative overflow-hidden rounded-2xl">
      {/* Imagen con zoom suave al hover */}
      <img
        src={image}
        alt={title || `Obra de arte ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />
      
      {/* Overlay gradiente que aparece suave */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
      
      {/* Brillo sutil que se desliza */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
        }}
      />

      {/* Icono de lupa/zoom que aparece en el centro */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out">
        <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center border border-white/30 scale-75 group-hover:scale-100 transition-transform duration-400">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>

    {/* Etiqueta inferior con animación de aparición */}
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50 shadow-lg z-10 transition-all duration-400 ease-out group-hover:bg-white/95 group-hover:shadow-xl group-hover:bottom-4">
      <span className={`text-xs font-semibold tracking-wide uppercase ${
        index % 3 === 0 ? 'text-watercolor-blue' : 
        index % 3 === 1 ? 'text-watercolor-purple' : 
        'text-watercolor-pink'
      }`}>
        {`Obra ${index + 1}`}
      </span>
    </div>
  </motion.div>
)

export default GalleryItem