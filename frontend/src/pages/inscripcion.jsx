import React, { useState } from 'react'
import InscripcionSuccess from '../components/ui/InscripcionSuccess.jsx'
import InscripcionForm from '../components/ui/InscripcionForm.jsx'

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
      <InscripcionSuccess 
        formData={formData} 
        setIsSubmitted={setIsSubmitted} 
        setFormData={setFormData} 
      />
    )
  }

  return (
    <InscripcionForm 
      formData={formData}
      errors={errors}
      isSubmitting={isSubmitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default Inscripcion