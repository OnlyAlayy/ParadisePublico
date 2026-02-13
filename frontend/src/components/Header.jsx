import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png' 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/historia', label: 'Historia' },
    { path: '/inscripcion', label: 'Inscripción' },
    { path: '/productos', label: 'Productos' },
    { path: '/contacto', label: 'Contacto' },
    { path: '/recuerdos', label: 'Recuerdos' },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">

          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">

              {/* Imagen del logo */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <img 
                  src={logo} 
                  alt="Logo Taller Paradise" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Efecto glow detrás */}
            </div>

            {/* Título y subtítulo */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-watercolor-blue to-watercolor-purple bg-clip-text text-transparent">
                Taller Paradise
              </h1>
              <p className="text-sm text-gray-600">Dibujo y Pintura</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-watercolor-purple'
                    : 'text-gray-600 hover:text-watercolor-blue'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-watercolor-blue to-watercolor-purple rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-watercolor-blue transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`w-full h-0.5 bg-watercolor-purple transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-watercolor-pink transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-watercolor-blue/10 to-watercolor-purple/10 text-watercolor-purple border-l-4 border-watercolor-purple'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.nav>

      </div>
    </motion.header>
  )
}

export default Header
