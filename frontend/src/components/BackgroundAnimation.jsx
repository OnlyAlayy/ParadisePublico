import React from 'react'
import { motion } from 'framer-motion'

const BackgroundAnimation = () => {
  const colors = [
    'from-watercolor-blue/10 to-watercolor-purple/10',
    'from-watercolor-pink/10 to-watercolor-yellow/10',
    'from-watercolor-green/10 to-watercolor-blue/10',
    'from-watercolor-orange/10 to-watercolor-pink/10'
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-r ${color} blur-3xl`}
          style={{
            width: `${200 + index * 100}px`,
            height: `${200 + index * 100}px`,
            top: `${20 + index * 15}%`,
            left: `${10 + index * 20}%`,
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            delay: index * 2,
          }}
        />
      ))}
    </div>
  )
}

export default BackgroundAnimation