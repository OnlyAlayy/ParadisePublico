import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'

// Importar componentes que usas (si existen)
const WatercolorBackground = ({ intensity, colors }) => (
  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-200 to-purple-200"></div>
)

const RealisticBrushStrokes = ({ section }) => (
  <div className="absolute inset-0 opacity-5">
    {/* Aquí irían tus trazos de pincel */}
  </div>
)

const SectionWrapper = forwardRef(({ 
  children, 
  background = "default",
  watercolor = false,
  brushStrokes = false,
  sectionType = "default",
  className = ""
}, ref) => {
  const backgroundStyles = {
    default: "bg-white",
    gradient: "bg-gradient-to-br from-watercolor-blue/5 to-watercolor-purple/5",
    dark: "bg-gray-900",
    transparent: "bg-transparent"
  }

  return (
    <motion.section
      ref={ref}
      className={`relative overflow-hidden ${backgroundStyles[background]} ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {watercolor && <WatercolorBackground intensity="light" colors="pastel" />}
      {brushStrokes && <RealisticBrushStrokes section={sectionType} />}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  )
})

// Esto es importante para debugging en React DevTools
SectionWrapper.displayName = 'SectionWrapper'

export default SectionWrapper