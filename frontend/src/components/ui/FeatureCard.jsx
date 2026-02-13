import React from 'react'
import { motion } from 'framer-motion'

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  index,
  ...props 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.6, 
      delay: index * 0.1,
      ease: "easeOut"
    }}
    whileHover={{ 
      scale: 1.03,
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" }
    }}
    className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative group backdrop-blur-sm bg-white/95"
    {...props}
  >
    <motion.div
      className="relative z-10 mb-6"
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -2, 2, 0],
      }}
      transition={{ 
        duration: 0.4,
        ease: "easeInOut"
      }}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10 tracking-tight">
      {title}
    </h3>
    <p className="text-gray-600 relative z-10 leading-relaxed font-light">
      {description}
    </p>

    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-watercolor-blue/5 to-watercolor-purple/5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
  </motion.div>
)

export default FeatureCard