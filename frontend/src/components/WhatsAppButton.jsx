import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/541127542411"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse-soft"
    >
      <FaWhatsapp className="text-2xl" />
    </motion.a>
  )
}

export default WhatsAppButton