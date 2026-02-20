import React from 'react'
import logo from '../assets/logo.png' 

// SVG Icons para Footer - Mantener tamaño consistente
const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.38 0 .02 5.36.02 12c0 2.12.55 4.2 1.59 6.04L0 24l6.21-1.63A11.86 11.86 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.18-3.48-8.52zM12 22a9.87 9.87 0 0 1-5.04-1.38l-.36-.21-3.69.97.99-3.6-.24-.37A9.94 9.94 0 1 1 12 22zm5.02-7.54c-.28-.14-1.67-.82-1.93-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.09-.17.18-.33.2-.61.07a8.14 8.14 0 0 1-2.38-1.46 8.9 8.9 0 0 1-1.65-2.04c-.17-.3-.02-.46.13-.6.14-.14.31-.37.47-.55.16-.18.21-.32.32-.53.1-.21.05-.4-.02-.56-.07-.16-.64-1.53-.88-2.1-.23-.56-.47-.48-.64-.49l-.55-.01a1.06 1.06 0 0 0-.77.36c-.26.28-.98.96-.98 2.35 0 1.4 1.01 2.76 1.15 2.94.14.18 1.98 3.04 4.8 4.26.67.29 1.19.46 1.59.59.67.21 1.28.18 1.77.11.54-.08 1.67-.68 1.91-1.34.24-.66.24-1.23.17-1.34-.07-.11-.25-.18-.53-.32z" />
  </svg>
)

const MapMarkerIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
  </svg>
)

const ClockIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
  </svg>
)

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={logo} 
                  alt="Logo Taller Paradise" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Taller Paradise</h3>
                <p className="text-gray-400">Dibujo y Pintura</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Donde la creatividad de los niños florece. Un espacio seguro y divertido 
              para explorar el maravilloso mundo del arte.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/taller_paradise" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5491127542411" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Horarios Actualizados */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Horarios</h4>
            <div className="space-y-2 text-gray-400">
              {/* Martes */}
              <div className="flex items-start space-x-2">
                <ClockIcon className="w-5 h-5 text-watercolor-yellow flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span>Martes: 9:00 - 11:00</span>
                  <span>Martes: 15:00 - 17:00</span>
                </div>
              </div>
              
              {/* Miércoles */}
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-watercolor-yellow flex-shrink-0" />
                <span>Miércoles: 15:00 - 17:00</span>
              </div>

              {/* Viernes */}
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-watercolor-yellow flex-shrink-0" />
                <span>Viernes: 15:00 - 17:00</span>
              </div>

              {/* Sábados */}
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-watercolor-yellow flex-shrink-0" />
                <span>Sábados: 9:00 - 11:00</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <ClockIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <span>Sábados: 15:00 - 17:00 (Lleno)</span>
              </div>
            </div>
          </div>

          {/* Contacto Interactivo */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-gray-400">
              
              {/* Dirección - Link a Google Maps */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Bermejo+3867"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 group"
              >
                <MapMarkerIcon className="w-5 h-5 text-watercolor-red group-hover:scale-110 transition-transform" />
                <span className="border-b border-transparent group-hover:border-gray-400">
                  Bermejo 3867
                </span>
              </a>

              {/* WhatsApp - Link a la API de WhatsApp */}
              <a 
                href="https://wa.me/5491127542411"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 group"
              >
                <WhatsAppIcon className="w-5 h-5 text-watercolor-green group-hover:scale-110 transition-transform" />
                <span className="border-b border-transparent group-hover:border-gray-400">
                  11 2754 2411
                </span>
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Taller Paradise. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer