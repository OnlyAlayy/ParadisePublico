import React from 'react'
import { motion } from 'framer-motion'
import useWindowSize from '../../hooks/useWindowSize'

const CTAParticles = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  
  if (!windowWidth || !windowHeight) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/50"
          initial={{
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
          }}
          animate={{
            y: [null, -80, 0],
            x: [null, Math.random() * 40 - 20],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            width: Math.random() * 10 + 4,
            height: Math.random() * 10 + 4,
          }}
        />
      ))}
    </div>
  )
}

export default CTAParticles