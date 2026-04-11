import React from 'react';
import { motion } from 'framer-motion';

import RealisticBrushStrokes from './RealisticBrushStrokes';
import { CheckIcon, PaperPlaneIcon } from './FormIcons';

const InscripcionSuccess = ({ formData, setIsSubmitted, setFormData }) => {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <RealisticBrushStrokes 
        section="light" 
        intensity="light"
        positions={{
          1: { top: "10%", left: "5%", width: "20rem", height: "10rem" },
          2: { top: "5%", right: "8%", width: "18rem", height: "8rem" },
          3: { bottom: "15%", left: "10%", width: "22rem", height: "11rem" },
          4: { bottom: "8%", right: "12%", width: "16rem", height: "7rem" },
          5: { top: "40%", left: "15%", width: "14rem", height: "6rem" },
          6: { top: "60%", right: "20%", width: "20rem", height: "9rem" },
          7: { top: "25%", left: "60%", width: "12rem", height: "5rem" },
        }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-watercolor-blue/10 via-watercolor-purple/10 to-watercolor-pink/10 relative z-10"
      >
        <div className="text-center p-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md mx-4 border border-white/50">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-watercolor-green to-watercolor-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckIcon className="text-white text-4xl" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            ¡Inscripción Exitosa!
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 mb-6 leading-relaxed"
          >
            Hemos recibido la inscripción de <strong>{formData.nombreNino}</strong>. 
            Te contactaremos pronto para confirmar los detalles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-watercolor-blue/10 rounded-2xl p-4 mb-6 border border-watercolor-blue/20"
          >
            <p className="text-watercolor-blue text-sm font-medium">
              📧 Te enviaremos un email de confirmación en las próximas 24 horas
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                nombreNino: '',
                edad: '',
                nombreAdulto: '',
                telefono: '',
                email: '',
                horario: '',
                mensaje: ''
              });
            }}
            className="bg-gradient-to-r from-watercolor-blue to-watercolor-purple text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <PaperPlaneIcon className="w-5 h-5" />
            Nueva Inscripción
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default InscripcionSuccess;
