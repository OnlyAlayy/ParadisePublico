import React from 'react'
import { motion } from 'framer-motion'

const SubtleDecorations = () => (
  <>
    <motion.div
      className="absolute top-1/4 left-5 w-16 h-16 bg-watercolor-blue/10 rounded-full"
      animate={{
        y: [0, -12, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    />
    <motion.div
      className="absolute bottom-1/3 right-5 w-12 h-12 bg-watercolor-purple/10 rounded-full"
      animate={{
        y: [0, 15, 0],
        opacity: [0.2, 0.4, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        delay: 1.5,
        ease: "easeInOut"
      }}
    />
  </>
)

export default SubtleDecorations