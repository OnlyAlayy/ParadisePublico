import React from 'react'
import { motion } from 'framer-motion'

const HeroTitle = () => (
  <motion.div
    className="mb-8"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
  >
    <motion.h1
      className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <span className="text-white drop-shadow-2xl">
        Taller{" "}
      </span>
      
      <span className="relative inline-block">
        <motion.span
          className="relative z-10 bg-gradient-to-r from-watercolor-yellow to-amber-300 bg-clip-text text-transparent drop-shadow-2xl"
          animate={{ 
            textShadow: [
              "0 0 20px rgba(245,158,11,0.4)",
              "0 0 30px rgba(245,158,11,0.7)",
              "0 0 20px rgba(245,158,11,0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Paradise
        </motion.span>
        
        {/* Efecto de partículas alrededor de "Paradise" */}
        <div className="absolute inset-0 overflow-visible">
          {[...Array(10)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute text-watercolor-yellow pointer-events-none"
              initial={{ 
                scale: 0,
                opacity: 0,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: [0, 180],
                x: [0, (Math.random() - 0.5) * 40, 0],
                y: [0, (Math.random() - 0.5) * 40, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
              style={{
                fontSize: Math.random() * 10 + 6,
                transform: 'translate(-50%, -50%)',
              }}
            >
              ✨
            </motion.span>
          ))}
        </div>
      </span>
    </motion.h1>

    {/* Línea decorativa bajo el título */}
    <motion.div
      className="h-0.5 bg-gradient-to-r from-transparent via-watercolor-yellow to-transparent mx-auto mt-6"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "180px", opacity: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
    />
  </motion.div>
)

export default HeroTitle