import React from 'react'
import { motion } from 'framer-motion'

const GalleryItem = ({ index, image, title, isMobile, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ 
      duration: 0.35, 
      delay: index * 0.05, 
      ease: "easeOut" 
    }}
    className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl bg-white border border-gray-200/70 hover:border-watercolor-purple/40 transition-all duration-300 ease-out group cursor-pointer hover:-translate-y-1"
    {...props}
  >
    <div className="aspect-square relative overflow-hidden">
      <img
        src={image}
        alt={title || `Obra de arte ${index + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />
      
      {/* Overlay sutil al hacer hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Etiqueta inferior */}
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/60 shadow-md z-10 transition-all duration-300 group-hover:bg-white group-hover:shadow-lg">
      <span className={`text-sm font-medium ${
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