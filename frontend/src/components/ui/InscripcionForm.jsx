import React from 'react';
import { motion } from 'framer-motion';
import PaintBrushCursor from './PaintBrushCursor';
import RealisticBrushStrokes from './RealisticBrushStrokes';
import {
  ChildIcon,
  UserIcon,
  PhoneIcon,
  EmailIcon,
  ClockIcon,
  PaperPlaneIcon
} from './FormIcons';

const InscripcionForm = ({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit
}) => {
  return (
    <div className="relative overflow-hidden cursor-none">
      <PaintBrushCursor />
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-12 bg-gradient-to-br from-watercolor-blue/5 via-watercolor-purple/5 to-watercolor-pink/5 relative z-10"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <motion.h1
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-watercolor-blue via-watercolor-purple to-watercolor-pink bg-clip-text text-transparent mb-4"
            >
              Inscripción al Taller
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Completa el formulario para inscribir a tu hijo/a y comenzar esta aventura artística
            </motion.p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre del niño/a */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <ChildIcon className="text-watercolor-blue mr-3 w-6 h-6" />
                    Nombre del niño/a
                  </label>
                  <input
                    type="text"
                    name="nombreNino"
                    value={formData.nombreNino}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                      errors.nombreNino 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-watercolor-blue focus:ring-watercolor-blue/20'
                    }`}
                    placeholder="Ej: María González"
                  />
                  {errors.nombreNino && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.nombreNino}
                    </motion.p>
                  )}
                </motion.div>

                {/* Edad */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <ChildIcon className="text-watercolor-pink mr-3 w-6 h-6" />
                    Edad del niño/a
                  </label>
                  <input
                    type="number"
                    name="edad"
                    value={formData.edad}
                    onChange={handleChange}
                    min="4"
                    max="13"
                    required
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                      errors.edad 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-watercolor-pink focus:ring-watercolor-pink/20'
                    }`}
                    placeholder="Ej: 8 años"
                  />
                  {errors.edad && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.edad}
                    </motion.p>
                  )}
                </motion.div>

                {/* Nombre del adulto responsable */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <UserIcon className="text-watercolor-green mr-3 w-6 h-6" />
                    Nombre del adulto responsable
                  </label>
                  <input
                    type="text"
                    name="nombreAdulto"
                    value={formData.nombreAdulto}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                      errors.nombreAdulto 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-watercolor-green focus:ring-watercolor-green/20'
                    }`}
                    placeholder="Ej: Ana López"
                  />
                  {errors.nombreAdulto && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.nombreAdulto}
                    </motion.p>
                  )}
                </motion.div>

                {/* Teléfono */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <PhoneIcon className="text-watercolor-orange mr-3 w-6 h-6" />
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                      errors.telefono 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-watercolor-orange focus:ring-watercolor-orange/20'
                    }`}
                    placeholder="Ej: 11 2754 2411"
                  />
                  {errors.telefono && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.telefono}
                    </motion.p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <EmailIcon className="text-watercolor-purple mr-3 w-6 h-6" />
                    Email de contacto
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-watercolor-purple focus:ring-watercolor-purple/20'
                    }`}
                    placeholder="Ej: ana@email.com"
                  />
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Horario preferido */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <ClockIcon className="text-watercolor-yellow mr-3 w-6 h-6" />
                    Horario preferido
                  </label>
                  <select
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                      errors.horario 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                        : 'border-gray-200 focus:border-watercolor-yellow focus:ring-watercolor-yellow/20'
                    }`}
                  >
                    <option value="">Selecciona un horario disponible</option>
                    <option value="Viernes 15:00 a 17:00">Viernes 15:00 a 17:00</option>
                    <option value="Sábados 9:00 a 11:00">Sábados 9:00 a 11:00</option>
                    <option value="Sábados 15:00 a 17:00" disabled>Sábados 15:00 a 17:00 (Cupo lleno)</option>
                  </select>
                  {errors.horario && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 flex items-center gap-2"
                    >
                      ⚠️ {errors.horario}
                    </motion.p>
                  )}
                </motion.div>

                {/* Mensaje adicional */}
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.85 }}
                >
                  <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                    <svg className="text-watercolor-blue mr-3 w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V15H13V17M13,13H11V7H13V13Z"/>
                    </svg>
                    Mensaje adicional (opcional)
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-watercolor-blue focus:ring-4 focus:ring-watercolor-blue/20 transition-all duration-300 resize-none"
                    placeholder="Alguna información adicional que quieras compartir..."
                  />
                </motion.div>

                {/* Botón de envío */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="pt-6"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                      isSubmitting || Object.keys(errors).length > 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-watercolor-blue to-watercolor-purple hover:shadow-xl'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Procesando inscripción...
                      </>
                    ) : (
                      <>
                        <PaperPlaneIcon className="mr-3 w-5 h-5" />
                        Enviar Inscripción
                      </>
                    )}
                  </motion.button>
                  
                  {Object.keys(errors).length > 0 && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm mt-3 text-center"
                    >
                      Por favor corrige los errores antes de enviar
                    </motion.p>
                  )}
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InscripcionForm;
