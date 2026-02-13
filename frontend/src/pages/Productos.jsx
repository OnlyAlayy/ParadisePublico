import React, { useState } from 'react'
import { motion } from 'framer-motion'
import RealisticBrushStrokes from '../components/ui/RealisticBrushStrokes'
import PaintBrushCursor from '../components/ui/PaintBrushCursor.jsx'

import capitoliox25 from '../assets/capitoliox25.jpg'
import acrilicosnormales from '../assets/AcrilicosNormales.jpg'
import acrilicosfluo from '../assets/AcrilicosFluo.png'
import caballeteportatil from '../assets/CaballetePortatil.png'
import kitparadise from '../assets/KitParadise.png'
import giottox12 from '../assets/LapicesGiotto12.png'
import gomafilgo from '../assets/GomaFilgo.png'
import lapizfilgo from '../assets/LapizFilgo.png'
import LapizNegroRobertColor from '../assets/LapizNegroRobertColor.png'

const Productos = () => {
  const [clickedButtons, setClickedButtons] = useState({})

  const products = [
    {
      id: 1,
      name: "Block de Hojas Blancas",
      price: "$3000",
      image: capitoliox25,
      description: "Block de 24 hojas lisas N°5, perfecto para dibujo, acuarela y pintura",
      emoji: "📄"
    },
    {
      id: 2,
      name: "Acrilicos Normales",
      price: "$3.200",
      image: acrilicosnormales,
      description: "Set de acrílicos decorativos x5 Eterna de 50ml con acabado profesional y alta pigmentación.",
      emoji: "✏️"
    },
    {
      id: 3,
      name: "Acrilicos Fluo",
      price: "$2.800",
      image: acrilicosfluo,
      description: "Set de 5 acrílicos decorativos Eterna de 50ml, colores intensos con alta pigmentación y efecto fluorescente reactivo a la luz UV.",
      emoji: "🖌️"
    },
    {
      id: 4,
      name: "Atril De Mesa",
      price: "$4.500",
      image: caballeteportatil,
      description: "Atril de mesa de madera, regulable y compacto, ideal para pintar con comodidad en espacios reducidos.",
      emoji: "🎨"
    },
    {
      id: 5,
      name: "Kit Inicial Paradise",
      price: "$8.900",
      image: kitparadise,
      description: "Kit completo ideal para principiantes",
      emoji: "📦",
      featured: true,
      featuredText: "El más elegido por alumnos nuevos"
    },
    {
      id: 6,
      name: "Lapices de Colores Giotto",
      price: "$6.500",
      image: giottox12,
      description: "Set de 12 lapices de colores Giotto, ideal para niños",
      emoji: "✏️"
    },
    {
      id: 7,
      name: "Goma Filgo",
      price: "$6.500",
      image: gomafilgo,
      description: "Goma de borrar blanca de calidad para niños",
      emoji: "🧹"
    },
    {
      id: 8,
      name: "Lapiz Filgo",
      price: "$6.500",
      image: lapizfilgo,
      description: "Lapiz de grafito de calidad para niños",
      emoji: "✏️"
    },
    {
      id: 9,
      name: "Lapiz Negro Robert Color",
      price: "$7.500",
      image: LapizNegroRobertColor,
      description: "Lapiz negro de calidad para niños",
      emoji: "✏️"
    }
  ]

  const handleButtonClick = (productId) => {
    setClickedButtons(prev => ({
      ...prev,
      [productId]: true
    }))
    
    setTimeout(() => {
      setClickedButtons(prev => ({
        ...prev,
        [productId]: false
      }))
    }, 2000)
  }

  // Variantes para las animaciones al hacer scroll
  const scrollContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const scrollItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const cardHover = {
    scale: 1.02,
    y: -5,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }

  // Variantes para elementos informativos
  const infoItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* Trazos de pincel en el fondo y pincel*/}
      <PaintBrushCursor />
      <RealisticBrushStrokes 
        section="light" 
        intensity="light"
        positions={{
          1: { top: "10%", left: "5%", width: "18rem", height: "9rem" },
          2: { top: "15%", right: "7%", width: "16rem", height: "8rem" },
          3: { top: "60%", left: "8%", width: "14rem", height: "7rem" },
          4: { top: "65%", right: "10%", width: "12rem", height: "6rem" },
          5: { top: "35%", left: "60%", width: "15rem", height: "7rem" },
          6: { top: "75%", right: "20%", width: "13rem", height: "6rem" }
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-12 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/10 relative z-10"
      >
        <div className="container mx-auto px-4">
          {/* Header con mejoras sutiles */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Materiales <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Artísticos</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
              Herramientas de calidad para dar vida a la creatividad de nuestros pequeños artistas
            </p>
            <p className="text-gray-500 text-lg">
              Elegí el material que vas a usar en clase
            </p>
          </motion.div>

          {/* Grid de productos con animaciones al hacer scroll */}
          <motion.div
            variants={scrollContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={scrollItemVariants}
                whileHover={cardHover}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className={`bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-300 relative ${
                  product.featured ? 'ring-2 ring-purple-200' : ''
                }`}
              >
                {/* Header con imagen del producto */}
                <div className="relative w-full aspect-square md:aspect-video overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-800 leading-tight">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <div className="flex flex-col items-end ml-2">
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg mb-1"
                        >
                          Recomendado
                        </motion.span>
                        <span className="text-xs text-gray-500 text-right leading-tight max-w-[100px]">
                          {product.featuredText}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">
                      {product.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleButtonClick(product.id)}
                      className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 shadow-md ${
                        clickedButtons[product.id] ? 'bg-green-500' : ''
                      }`}
                    >
                      {clickedButtons[product.id] ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1"
                        >
                          <span>✓</span>
                          <span>Enviado</span>
                        </motion.span>
                      ) : (
                        "Quiero este"
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Información adicional - Con animaciones al hacer scroll */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scrollContainerVariants}
            className="max-w-4xl mx-auto mt-20 bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100/50"
          >
            <motion.h2 
              variants={infoItemVariants}
              className="text-3xl font-bold text-center text-gray-800 mb-4"
            >
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                🎨 Para tu Primera Clase
              </span>
            </motion.h2>
            
            <motion.p 
              variants={infoItemVariants}
              className="text-gray-600 text-center mb-8 text-lg"
            >
              ¿Qué necesito para comenzar?
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                variants={infoItemVariants}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-3">
                  <span className="text-2xl">📝</span>
                  Materiales Sugeridos
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Block de hojas blancas lisas",
                    "Lápiz HB y 6B + goma blanca", 
                    "Lápices de colores profesionales",
                    "Acrílicos básicos + pinceles",
                    "Platito y trapito para limpiar"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={infoItemVariants}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold text-purple-600 mb-4 flex items-center gap-3">
                  <span className="text-2xl">🌟</span>
                  Recomendaciones
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "Ropa cómoda que se pueda manchar",
                    "Trabajos anteriores (si tienes)",
                    "Mucha curiosidad y ganas de crear",
                    "Una sonrisa y buena energía"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50/50 transition-colors duration-300"
                    >
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Mensaje inspirador */}
            <motion.div
              variants={infoItemVariants}
              className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100 text-center"
            >
              <p className="text-gray-700 italic text-lg">
                "No necesitas los materiales más caros, solo las ganas de crear y explorar"
              </p>
              <p className="text-gray-500 mt-2">- Taller Paradise</p>
            </motion.div>
          </motion.div>

          {/* Sección de inspiración adicional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 max-w-2xl mx-auto">
              ¿Tienes dudas sobre qué materiales elegir? Estamos aquí para ayudarte a encontrar 
              lo que mejor se adapte a tu proceso creativo.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Productos