import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PaintBrushCursor from '../components/ui/PaintBrushCursor.jsx'
import RealisticBrushStrokes from '../components/ui/RealisticBrushStrokes'

// Componentes SVG personalizados (mantenemos los mismos)
const ChildIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A3,3 0 0,1 15,5A3,3 0 0,1 12,8A3,3 0 0,1 9,5A3,3 0 0,1 12,2M12,9C13.63,9 15.12,9.35 16.5,10.05C17.84,10.76 18.5,11.61 18.5,12.61V18.38C18.5,19.5 17.64,20.44 15.33,21.19C14.28,21.53 13.15,21.74 12,21.74C10.85,21.74 9.72,21.53 8.67,21.19C6.36,20.44 5.5,19.5 5.5,18.38V12.61C5.5,11.61 6.16,10.76 7.5,10.05C8.88,9.35 10.38,9 12,9Z"/>
  </svg>
)

const UserIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
  </svg>
)

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
  </svg>
)

const EmailIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
  </svg>
)

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
  </svg>
)

const SaveIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z"/>
  </svg>
)

const PaperPlaneIcon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
  </svg>
)

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
  </svg>
)

const Inscripcion = () => {
  const [formData, setFormData] = useState({
    nombreNino: '',
    edad: '',
    nombreAdulto: '',
    telefono: '',
    email: '',
    horario: '',
    mensaje: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // Validación en tiempo real
  const validateField = (name, value) => {
    const newErrors = { ...errors }
    
    switch (name) {
      case 'nombreNino':
      case 'nombreAdulto':
        if (!value.trim()) {
          newErrors[name] = 'Este campo es requerido'
        } else if (value.trim().length < 2) {
          newErrors[name] = 'Debe tener al menos 2 caracteres'
        } else {
          delete newErrors[name]
        }
        break
        
      case 'edad':
        if (!value) {
          newErrors[name] = 'Este campo es requerido'
        } else if (value < 4 || value > 13) {
          newErrors[name] = 'La edad debe ser entre 4 y 13 años'
        } else {
          delete newErrors[name]
        }
        break
        
      case 'telefono':
        if (!value.trim()) {
          newErrors[name] = 'Este campo es requerido'
        } else if (!/^[\d+\-\s()]{8,20}$/.test(value.replace(/\s/g, ''))) {
          newErrors[name] = 'Formato de teléfono inválido'
        } else {
          delete newErrors[name]
        }
        break
        
      case 'email':
        if (!value.trim()) {
          newErrors[name] = 'Este campo es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Formato de email inválido'
        } else {
          delete newErrors[name]
        }
        break
        
      case 'horario':
        if (!value) {
          newErrors[name] = 'Por favor selecciona un horario'
        } else {
          delete newErrors[name]
        }
        break
        
      default:
        break
    }
    
    setErrors(newErrors)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Validar campo después de cambiar
    setTimeout(() => validateField(name, value), 300)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar todos los campos antes de enviar
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key])
    })
    
    if (Object.keys(errors).length > 0) {
      return
    }
    
    setIsSubmitting(true)

    try {
      // URL del backend - MISMOS AJUSTES QUE EN ADMINRECUERDOS
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
      
      console.log('📤 Enviando inscripción a:', BACKEND_URL)
      
      const response = await fetch(`${BACKEND_URL}/api/inscripcion`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Error en el servidor')
      }

      console.log('✅ Respuesta del backend:', result)
      
      if (result.success) {
        setIsSubmitted(true)
        console.log('📧 Email enviado:', result.notifications.email)
        console.log('📱 WhatsApp enviado:', result.notifications.whatsapp)
      } else {
        throw new Error(result.message)
      }
      
    } catch (error) {
      console.error('❌ Error en inscripción:', error)
      
      let errorMessage = 'Error de conexión. Por favor, intenta nuevamente.'
      
      if (error.message.includes('Twilio')) {
        errorMessage = 'Error en el servicio de WhatsApp. La dueña recibirá un email con tu inscripción.'
      } else if (error.message.includes('email')) {
        errorMessage = 'Error en el servicio de email. Por favor, contacta al taller directamente.'
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="relative overflow-hidden cursor-none min-h-screen">
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
                setIsSubmitted(false)
                setFormData({
                  nombreNino: '',
                  edad: '',
                  nombreAdulto: '',
                  telefono: '',
                  email: '',
                  horario: '',
                  mensaje: ''
                })
              }}
              className="bg-gradient-to-r from-watercolor-blue to-watercolor-purple text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto"
            >
              <PaperPlaneIcon className="w-5 h-5" />
              Nueva Inscripción
            </motion.button>
          </div>
        </motion.div>
      </div>
    )
  }

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
  )
}

export default Inscripcion