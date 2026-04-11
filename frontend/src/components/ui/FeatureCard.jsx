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
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ 
      duration: 0.35, 
      delay: index * 0.08,
      ease: "easeOut"
    }}
    className="bg-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-gray-100 relative group backdrop-blur-sm bg-white/95 hover:-translate-y-1"
    {...props}
  >
    <div className="relative z-10 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3 relative z-10 tracking-tight">
      {title}
    </h3>
    <p className="text-gray-600 relative z-10 leading-relaxed font-light">
      {description}
    </p>

    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-watercolor-blue/5 to-watercolor-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
)

export default FeatureCard