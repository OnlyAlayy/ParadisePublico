import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaintBrushCursor from '../components/ui/PaintBrushCursor.jsx'
import RealisticBrushStrokes from '../components/ui/RealisticBrushStrokes'

// Componentes SVG personalizados con colores
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

// SearchIcon con color
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`text-watercolor-blue ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
  </svg>
)

// Instagram - Rosa/Magenta oficial
const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`text-[#E1306C] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2C22,19.4 19.4,22 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8C2,4.6 4.6,2 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
  </svg>
)

// Facebook - Azul oficial
const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`text-[#1877F2] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0,0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/>
  </svg>
)

// Google Icon - SVG Multicapa con sus 4 colores oficiales
const GoogleIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
)

// Recomendación - Color naranja coral vibrante
const RecommendationIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`text-[#FF6B6B] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,7.5C10.62,7.5 9.5,8.62 9.5,10C9.5,11.38 10.62,12.5 12,12.5C13.38,12.5 14.5,11.38 14.5,10C14.5,8.62 13.38,7.5 12,7.5M12,14C9.67,14 5.5,15.17 5.5,17.5V18H18.5V17.5C18.5,15.17 14.33,14 12,14Z"/>
  </svg>
)

// WhatsApp - Verde oficial
const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`text-[#25D366] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2M12.05 3.67C16.6 3.67 20.27 7.35 20.27 11.92C20.27 16.49 16.6 20.17 12.05 20.17C10.45 20.17 8.9 19.74 7.56 18.94L7.19 18.73L4.1 19.56L4.95 16.57L4.73 16.19C3.86 14.78 3.41 13.17 3.41 11.5C3.41 6.94 7.09 3.27 11.64 3.27L12.05 3.67M9.09 6.97C8.92 6.97 8.6 7.05 8.33 7.34C8.05 7.63 7.33 8.32 7.33 9.71C7.33 11.1 8.31 12.44 8.44 12.62C8.57 12.8 10.11 15.31 12.52 16.27C14.4 17 14.92 16.83 15.35 16.79C15.78 16.75 16.61 16.13 16.77 15.51C16.93 14.89 16.93 14.37 16.87 14.26C16.81 14.15 16.61 14.07 16.33 13.96C16.05 13.85 14.9 13.28 14.65 13.2C14.4 13.12 14.22 13.07 14.03 13.36C13.84 13.65 13.34 14.18 13.17 14.37C13 14.56 12.83 14.58 12.55 14.47C12.27 14.36 11.5 14.09 10.6 13.3C9.89 12.68 9.42 11.92 9.25 11.62C9.08 11.32 9.22 11.15 9.38 10.99C9.52 10.84 9.69 10.64 9.85 10.46C10.01 10.28 10.07 10.15 10.16 9.94C10.25 9.73 10.2 9.54 10.13 9.43C10.06 9.32 9.58 8.15 9.38 7.68C9.18 7.21 9 7.07 8.75 7.05C8.61 7.03 8.45 7.02 8.29 7.02L9.09 6.97Z"/>
  </svg>
)

// Volante / Folleto - Púrpura suave
const FlyerIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`text-[#9C27B0] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20,2H4C2.9,2 2,2.9 2,4V16C2,17.1 2.9,18 4,18H8L12,22L16,18H20C21.1,18 22,17.1 22,16V4C22,2.9 21.1,2 20,2M20,16H15.17L12,19.17L8.83,16H4V4H20V16M9,10H15V12H9V10Z"/>
  </svg>
)

// Otro - Amarillo brillante
const OtherIcon = ({ className = "w-5 h-5" }) => (
  <svg className={`text-[#F59E0B] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12.5,7V11H16V13H12.5V17H10.5V13H7V11H10.5V7H12.5Z"/>
  </svg>
)

const PaperPlaneIcon = ({ className = "w-8 h-8" }) => (
  <svg className={`text-white ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
  </svg>
)

const CheckIcon = ({ className = "w-6 h-6" }) => (
  <svg className={`text-white ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
  </svg>
)

// Componente de progreso simple
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-watercolor-blue to-watercolor-purple"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

// Componente CustomSelect con iconos reales
const CustomSelect = ({ value, onChange, onBlur, options, placeholder, iconMap }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const selectRef = useRef(null)
  
  // Encontrar la opción seleccionada
  const selectedOption = options.find(opt => opt.value === value)
  
  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
        onBlur && onBlur()
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onBlur])
  
  const handleSelect = (optionValue) => {
    onChange({ target: { name: 'comoNosEncontro', value: optionValue } })
    setIsOpen(false)
  }
  
  return (
    <div className="relative" ref={selectRef}>
      {/* Botón del select personalizado */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          onBlur && onBlur()
        }}
        tabIndex={0}
        className={`w-full px-4 py-4 border-2 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
          isFocused ? 'border-watercolor-blue ring-4 ring-watercolor-blue/20' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center gap-3">
          {selectedOption ? (
            <>
              <span className="w-6 h-6 flex items-center justify-center">
                {iconMap[selectedOption.value]}
              </span>
              <span className="text-gray-800">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <motion.svg 
          className="w-5 h-5 text-gray-400"
          animate={{ rotate: isOpen ? 180 : 0 }}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </div>
      
      {/* Dropdown con opciones */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-64 overflow-y-auto"
          >
            {options.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ backgroundColor: '#f3f4f6' }}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                  value === option.value ? 'bg-watercolor-blue/10' : ''
                }`}
              >
                <span className="w-6 h-6 flex items-center justify-center">
                  {iconMap[option.value]}
                </span>
                <span className="text-gray-800">{option.label}</span>
                {value === option.value && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 text-watercolor-blue ml-auto"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
                  </motion.svg>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Inscripcion = () => {
  const [formData, setFormData] = useState({
    nombreNino: '',
    edad: '',
    nombreAdulto: '',
    telefono: '',
    email: '',
    horario: [],
    comoNosEncontro: '', // Nuevo campo
    mensaje: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [saveStatus, setSaveStatus] = useState('')

  const totalSteps = 3

  // Opciones para "Cómo nos encontraste"
  const comoNosEncontroOptions = [
    { value: 'Instagram', label: 'Instagram' },
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Google', label: 'Google' },
    { value: 'Recomendación', label: 'Recomendación de amigo/a' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'Volante', label: 'Volante / Folleto' },
    { value: 'Otro', label: 'Otro' }
  ]

  // Mapa de iconos para las opciones (todos con colores ya incluidos en los componentes)
  const iconMap = {
    'Instagram': <InstagramIcon className="w-5 h-5" />,
    'Facebook': <FacebookIcon className="w-5 h-5" />,
    'Google': <GoogleIcon className="w-5 h-5" />,
    'Recomendación': <RecommendationIcon className="w-5 h-5" />,
    'WhatsApp': <WhatsAppIcon className="w-5 h-5" />,
    'Volante': <FlyerIcon className="w-5 h-5" />,
    'Otro': <OtherIcon className="w-5 h-5" />
  }

    // Autoguardado simple - Carga automática
  useEffect(() => {
    const savedData = localStorage.getItem('inscripcionDraft')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        // Si horario no es array (por ejemplo, string de versiones anteriores), lo convertimos a array vacío
        if (parsed.horario && !Array.isArray(parsed.horario)) {
          parsed.horario = []   // Opcional: podrías dividir el string por comas si quieres conservar datos
        }
        setFormData(parsed)
        setSaveStatus('Borrador recuperado')
        setTimeout(() => setSaveStatus(''), 3000)
      } catch (e) {
        console.error('Error al cargar borrador:', e)
      }
    }
  }, [])

  // Validación en tiempo real mejorada
  const validateField = (name, value) => {
    const newErrors = { ...errors }
    
    switch (name) {
      case 'nombreNino':
      case 'nombreAdulto':
        if (!value.trim()) {
          newErrors[name] = 'Este campo es requerido'
        } else if (value.trim().length < 2) {
          newErrors[name] = 'Debe tener al menos 2 caracteres'
        } else if (value.trim().length > 50) {
          newErrors[name] = 'Máximo 50 caracteres'
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
        } else if (!/^[\d\s\-+()]{8,}$/.test(value.replace(/\s/g, ''))) {
          newErrors[name] = 'Teléfono inválido (mínimo 8 dígitos)'
        } else {
          delete newErrors[name]
        }
        break
        
      case 'email':
        if (!value.trim()) {
          newErrors[name] = 'Este campo es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Email inválido'
        } else {
          delete newErrors[name]
        }
        break
        
      case 'horario':
        if (!value || value.length === 0) {
          newErrors[name] = 'Por favor selecciona al menos un horario'
        } else {
          delete newErrors[name]
        }
        break
        
      // El campo comoNosEncontro es opcional, no necesita validación
      case 'comoNosEncontro':
        // Opcional, no validamos
        delete newErrors[name]
        break
        
      default:
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Validar después de un pequeño delay
    const timer = setTimeout(() => {
      validateField(name, value)
    }, 300)
    
    return () => clearTimeout(timer)
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouchedFields(prev => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const handleNextStep = () => {
    // Validar campos del paso actual
    let isValid = true
    const fieldsToValidate = 
      currentStep === 1 ? ['nombreNino', 'edad'] :
      currentStep === 2 ? ['nombreAdulto', 'telefono', 'email'] :
      ['horario'] // El campo comoNosEncontro es opcional, no lo validamos

    fieldsToValidate.forEach(field => {
      const fieldValid = validateField(field, formData[field])
      if (!fieldValid) isValid = false
      setTouchedFields(prev => ({ ...prev, [field]: true }))
    })

    if (isValid) {
      // Guardar borrador antes de avanzar
      localStorage.setItem('inscripcionDraft', JSON.stringify(formData))
      setSaveStatus('Borrador guardado')
      setTimeout(() => setSaveStatus(''), 2000)

      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    // Guardar borrador antes de retroceder
    localStorage.setItem('inscripcionDraft', JSON.stringify(formData))
    setSaveStatus('Borrador guardado')
    setTimeout(() => setSaveStatus(''), 2000)

    setCurrentStep(prev => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar todos los campos (excepto opcionales)
    let isValid = true
    Object.keys(formData).forEach(key => {
      if (key !== 'mensaje' && key !== 'comoNosEncontro') {
        const fieldValid = validateField(key, formData[key])
        if (!fieldValid) isValid = false
      }
    })
    
    if (!isValid) {
      alert('Por favor corrige los errores antes de enviar')
      return
    }
    
    setIsSubmitting(true)

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
      
      // Convertir array de horarios a string para el backend
      const dataToSend = {
        ...formData,
        horario: Array.isArray(formData.horario) ? formData.horario.join(', ') : formData.horario
      }
      
      const response = await fetch(`${BACKEND_URL}/api/inscripcion`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Error en el servidor')
      }
      
      if (result.success) {
        setIsSubmitted(true)
        localStorage.removeItem('inscripcionDraft')
      } else {
        throw new Error(result.message)
      }
      
    } catch (error) {
      console.error('❌ Error en inscripción:', error)
      
      let errorMessage = 'Error de conexión. Por favor, intenta nuevamente.'
      
      if (error.message.includes('Twilio')) {
        errorMessage = 'Error en WhatsApp. La dueña recibirá un email con tu inscripción.'
      } else if (error.message.includes('email')) {
        errorMessage = 'Error en email. Por favor, contacta al taller directamente.'
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para renderizar el icono según la opción seleccionada
  const renderSelectedIcon = () => {
    switch (formData.comoNosEncontro) {
      case 'Instagram':
        return <InstagramIcon className="w-6 h-6" />;
      case 'Facebook':
        return <FacebookIcon className="w-6 h-6" />;
      case 'Google':
        return <GoogleIcon className="w-6 h-6" />;
      case 'Recomendación':
        return <RecommendationIcon className="w-6 h-6" />;
      case 'WhatsApp':
        return <WhatsAppIcon className="w-6 h-6" />;
      case 'Volante':
        return <FlyerIcon className="w-6 h-6" />;
      case 'Otro':
        return <OtherIcon className="w-6 h-6" />;
      default:
        return <SearchIcon className="w-6 h-6" />;
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
                  horario: [],   
                  comoNosEncontro: '', 
                  mensaje: ''
                })
                setCurrentStep(1)
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
              Paso {currentStep} de {totalSteps}
            </motion.p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            
            {/* Indicador de guardado con estilo "Pill" y Glassmorphism */}
            <AnimatePresence>
              {saveStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex justify-center mb-4 mt-2"
                >
                  <div className="bg-white/80 backdrop-blur-md border border-watercolor-green/30 shadow-sm rounded-full px-4 py-2 flex items-center gap-2">
                    <div className="bg-gradient-to-r from-watercolor-green to-[#34A853] rounded-full p-1 shadow-sm">
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <span className="text-gray-600 text-sm font-medium tracking-wide">
                      {saveStatus}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* PASO 1: Datos del niño */}
                {currentStep === 1 && (
                  <>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                        <ChildIcon className="text-watercolor-blue mr-3 w-6 h-6" />
                        Nombre del niño/a <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombreNino"
                        value={formData.nombreNino}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                          errors.nombreNino && touchedFields.nombreNino
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : touchedFields.nombreNino && !errors.nombreNino && formData.nombreNino
                            ? 'border-green-500 bg-green-50/50'
                            : 'border-gray-200 focus:border-watercolor-blue focus:ring-watercolor-blue/20'
                        }`}
                        placeholder="Ej: María González"
                      />
                      {errors.nombreNino && touchedFields.nombreNino && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-2"
                        >
                          ⚠️ {errors.nombreNino}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                        <ChildIcon className="text-watercolor-pink mr-3 w-6 h-6" />
                        Edad del niño/a <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        name="edad"
                        value={formData.edad}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="4"
                        max="13"
                        required
                        className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                          errors.edad && touchedFields.edad
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : touchedFields.edad && !errors.edad && formData.edad
                            ? 'border-green-500 bg-green-50/50'
                            : 'border-gray-200 focus:border-watercolor-pink focus:ring-watercolor-pink/20'
                        }`}
                        placeholder="Ej: 8 años"
                      />
                      {errors.edad && touchedFields.edad && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-2"
                        >
                          ⚠️ {errors.edad}
                        </motion.p>
                      )}
                    </motion.div>
                  </>
                )}

                {/* PASO 2: Datos del adulto */}
                {currentStep === 2 && (
                  <>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                        <UserIcon className="text-watercolor-green mr-3 w-6 h-6" />
                        Adulto responsable <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombreAdulto"
                        value={formData.nombreAdulto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                          errors.nombreAdulto && touchedFields.nombreAdulto
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : touchedFields.nombreAdulto && !errors.nombreAdulto && formData.nombreAdulto
                            ? 'border-green-500 bg-green-50/50'
                            : 'border-gray-200 focus:border-watercolor-green focus:ring-watercolor-green/20'
                        }`}
                        placeholder="Ej: Ana López"
                      />
                      {errors.nombreAdulto && touchedFields.nombreAdulto && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-2"
                        >
                          ⚠️ {errors.nombreAdulto}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                        <PhoneIcon className="text-watercolor-orange mr-3 w-6 h-6" />
                        Teléfono / WhatsApp <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                          errors.telefono && touchedFields.telefono
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : touchedFields.telefono && !errors.telefono && formData.telefono
                            ? 'border-green-500 bg-green-50/50'
                            : 'border-gray-200 focus:border-watercolor-orange focus:ring-watercolor-orange/20'
                        }`}
                        placeholder="Ej: 11 2754 2411"
                      />
                      {errors.telefono && touchedFields.telefono && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-2"
                        >
                          ⚠️ {errors.telefono}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                        <EmailIcon className="text-watercolor-purple mr-3 w-6 h-6" />
                        Email de contacto <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-4 py-4 border-2 rounded-2xl focus:ring-4 transition-all duration-300 ${
                          errors.email && touchedFields.email
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                            : touchedFields.email && !errors.email && formData.email
                            ? 'border-green-500 bg-green-50/50'
                            : 'border-gray-200 focus:border-watercolor-purple focus:ring-watercolor-purple/20'
                        }`}
                        placeholder="Ej: ana@email.com"
                      />
                      {errors.email && touchedFields.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm mt-2 flex items-center gap-2"
                        >
                          ⚠️ {errors.email}
                        </motion.p>
                      )}
                    </motion.div>
                  </>
                )}

                {/* PASO 3: Horario, cómo nos encontraste y mensaje */}
                {currentStep === 3 && (
                  <>
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                            <ClockIcon className="text-watercolor-yellow mr-3 w-6 h-6" />
                            Horarios preferidos <span className="text-red-500 ml-1">*</span>
                          </label>
                          <p className="text-sm text-gray-500 mb-2">Podés elegir uno o varios</p>
                          <div className="space-y-3">
                            {[
                              'Martes 9:00 a 11:00',
                              'Martes 15:00 a 17:00',
                              'Miércoles 15:00 a 17:00',
                              'Viernes 15:00 a 17:00',
                              'Sábados 9:00 a 11:00',
                              { value: 'Sábados 15:00 a 17:00', disabled: true, label: 'Sábados 15:00 a 17:00 (Cupo lleno)' }
                            ].map((horario) => {
                              const isDisabled = typeof horario === 'object' ? horario.disabled : false;
                              const horarioValue = typeof horario === 'object' ? horario.value : horario;
                              const horarioLabel = typeof horario === 'object' ? horario.label : horario;
                              
                              return (
                                <motion.div
                                  key={horarioValue}
                                  whileHover={!isDisabled ? { scale: 1.02, x: 5 } : {}}
                                  className={`flex items-center p-3 rounded-xl border-2 transition-all duration-300 ${
                                    isDisabled
                                      ? 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                                      : formData.horario.includes(horarioValue)
                                      ? 'border-watercolor-yellow bg-watercolor-yellow/10 shadow-md'
                                      : 'border-gray-200 hover:border-watercolor-yellow/50 hover:bg-watercolor-yellow/5'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    name="horario"
                                    value={horarioValue}
                                    checked={formData.horario.includes(horarioValue)}
                                    onChange={(e) => {
                                      const { value, checked } = e.target;
                                      setFormData(prev => ({
                                        ...prev,
                                        horario: checked
                                          ? [...prev.horario, value]
                                          : prev.horario.filter(h => h !== value)
                                      }));
                                      setTouchedFields(prev => ({ ...prev, horario: true }));
                                    }}
                                    onBlur={() => {
                                      setTouchedFields(prev => ({ ...prev, horario: true }));
                                      validateField('horario', formData.horario);
                                    }}
                                    disabled={isDisabled}
                                    className={`w-5 h-5 rounded accent-watercolor-yellow ${
                                      isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'
                                    }`}
                                  />
                                  <span className={`ml-3 text-gray-700 ${isDisabled ? 'line-through' : ''}`}>
                                    {horarioLabel}
                                  </span>
                                  {formData.horario.includes(horarioValue) && !isDisabled && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="ml-auto text-watercolor-yellow"
                                    >
                                      ✓
                                    </motion.span>
                                  )}
                                </motion.div>
                              );
                            })}
                          </div>
                          {errors.horario && touchedFields.horario && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-red-500 text-sm mt-2 flex items-center gap-2"
                            >
                              ⚠️ {errors.horario}
                            </motion.p>
                          )}
                        </motion.div>
                    </motion.div>

                    {/* NUEVO CAMPO: ¿Cómo nos encontraste? - CON ICONOS REALES EN LAS OPCIONES */}
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                        <span className="mr-3 w-6 h-6 flex items-center justify-center">
                          {renderSelectedIcon()}
                        </span>
                        ¿Cómo nos encontraste? <span className="text-gray-400 text-sm ml-2">(opcional)</span>
                      </label>
                      
                      <CustomSelect
                        value={formData.comoNosEncontro}
                        onChange={handleChange}
                        onBlur={() => handleBlur({ target: { name: 'comoNosEncontro', value: formData.comoNosEncontro } })}
                        options={comoNosEncontroOptions}
                        placeholder="Selecciona una opción"
                        iconMap={iconMap}
                      />
                      
                      <p className="text-gray-500 text-xs mt-2 ml-2">
                        Nos ayuda a saber cómo llegar a más familias
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                        <svg className="text-watercolor-blue mr-3 w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,17H11V15H13V17M13,13H11V7H13V13Z"/>
                        </svg>
                        Mensaje adicional <span className="text-gray-400 text-sm ml-2">(opcional)</span>
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
                  </>
                )}

                {/* Botones de navegación */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pt-6 flex gap-4"
                >
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={handlePrevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 px-8 rounded-2xl font-semibold text-lg border-2 border-gray-300 hover:border-watercolor-blue transition-all duration-300"
                    >
                      ← Anterior
                    </motion.button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 px-8 rounded-2xl font-semibold text-lg bg-gradient-to-r from-watercolor-blue to-watercolor-purple text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Siguiente →
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || Object.keys(errors).length > 0}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 flex items-center justify-center ${
                        isSubmitting || Object.keys(errors).length > 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-watercolor-blue to-watercolor-purple hover:shadow-xl'
                      } text-white`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <PaperPlaneIcon className="mr-3 w-5 h-5" />
                          Enviar Inscripción
                        </>
                      )}
                    </motion.button>
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