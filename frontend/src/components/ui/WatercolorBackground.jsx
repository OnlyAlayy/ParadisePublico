import React from 'react'
import { motion } from 'framer-motion'

const WatercolorBackground = ({ intensity = "medium", colors = "default" }) => {
  const colorSets = {
    default: {
      primary: "rgba(147,51,234,0.3)",
      secondary: "rgba(59,130,246,0.3)", 
      accent: "rgba(236,72,153,0.25)",
      success: "rgba(34,197,94,0.2)",
      warning: "rgba(245,158,11,0.25)",
      purple: "rgba(168,85,247,0.2)"
    },
    pastel: {
      primary: "rgba(147,51,234,0.2)",
      secondary: "rgba(59,130,246,0.2)",
      accent: "rgba(236,72,153,0.15)",
      success: "rgba(34,197,94,0.15)",
      warning: "rgba(245,158,11,0.2)",
      purple: "rgba(168,85,247,0.15)"
    }
  }

  const opacityLevels = {
    light: { large: 0.1, medium: 0.08, small: 0.15 },
    medium: { large: 0.15, medium: 0.12, small: 0.2 },
    strong: { large: 0.2, medium: 0.15, small: 0.25 }
  }

  const currentColors = colorSets[colors] || colorSets.default
  const opacity = opacityLevels[intensity] || opacityLevels.medium

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Trazos grandes */}
      <motion.div
        className="absolute top-10 left-10 w-96 h-96"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle, ${currentColors.primary} 0%, transparent 70%)`,
          filter: "blur(40px)",
          borderRadius: "60% 40% 30% 70%",
          opacity: opacity.large
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          background: `radial-gradient(circle, ${currentColors.secondary} 0%, transparent 70%)`,
          filter: "blur(35px)",
          borderRadius: "40% 60% 70% 30%",
          opacity: opacity.large
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-72 h-72"
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          background: `radial-gradient(circle, ${currentColors.accent} 0%, transparent 70%)`,
          filter: "blur(30px)",
          borderRadius: "50% 30% 60% 40%",
          opacity: opacity.medium
        }}
      />

      {/* Trazos más pequeños */}
      <motion.div
        className="absolute top-40 right-40 w-32 h-32"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [opacity.small, opacity.small + 0.1, opacity.small],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle, ${currentColors.warning} 0%, transparent 70%)`,
          filter: "blur(20px)",
          borderRadius: "60% 40%",
        }}
      />
    </div>
  )
}

export default WatercolorBackground