import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AnimatedButton = ({ 
  to, 
  children, 
  className = "", 
  variant = "primary",
  ...props 
}) => {
  const baseClasses = "relative px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 border backdrop-blur-sm overflow-hidden group"
  
  const variants = {
    primary: "bg-gradient-to-r from-watercolor-purple to-watercolor-pink text-white border-white/20",
    secondary: "bg-gradient-to-br from-white to-white/95 text-watercolor-purple border-2 border-white/90 hover:border-watercolor-purple/50",
    cta: "bg-white text-watercolor-purple border-2 border-white/50"
  }

  const ButtonContent = (
    <motion.button
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === "primary" 
          ? "0 20px 40px rgba(147, 51, 234, 0.3)"
          : variant === "secondary"
          ? "0 15px 35px rgba(147, 51, 234, 0.25)"
          : "0 10px 10px rgba(255,255,255,0.4)"
      }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  )

  return to ? <Link to={to}>{ButtonContent}</Link> : ButtonContent
}

export default AnimatedButton