import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaShoppingCart, FaShoppingBag } from 'react-icons/fa'
import RealisticBrushStrokes from '../components/ui/RealisticBrushStrokes'


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
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

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

  const handleUpdateQuantity = (product, delta) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          const newProducts = prev.filter(p => p.id !== product.id);
          if (newProducts.length === 0) setIsCartOpen(false);
          return newProducts;
        }
        return prev.map(p => p.id === product.id ? { ...p, quantity: newQuantity } : p);
      }
      
      if (delta > 0) {
        return [...prev, { ...product, quantity: delta }];
      }
      return prev;
    });
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "5491100000000";
    const productNames = selectedProducts.map(p => `- ${p.quantity}x ${p.name} (${p.price} c/u)`).join('\n');
    const message = `¡Hola Taller Paradise! 🎨 Me gustaría pedir los siguientes materiales:\n\n${productNames}\n\n¿Tienen disponibilidad?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
                    {selectedProducts.find(p => p.id === product.id) ? (
                      <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl px-3 py-2 shadow-md text-white font-semibold">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                          onClick={() => handleUpdateQuantity(product, -1)}
                        >
                          -
                        </motion.button>
                        <span className="w-4 text-center">
                          {selectedProducts.find(p => p.id === product.id).quantity}
                        </span>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                          onClick={() => handleUpdateQuantity(product, 1)}
                        >
                          +
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleUpdateQuantity(product, 1)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 shadow-md"
                      >
                        Lo quiero
                      </motion.button>
                    )}
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

      {/* Botón flotante para abrir el carrito */}
      <AnimatePresence>
        {selectedProducts.length > 0 && !isCartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {selectedProducts.reduce((acc, p) => acc + p.quantity, 0)}
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar / Modal del Carrito */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            
            {/* Sidebar panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white shadow-2xl z-[70] flex flex-col border-l border-gray-100"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <FaShoppingBag className="text-purple-500 text-2xl" />
                  Tu Carrito
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-600 font-bold"
                >
                  ✕
                </button>
              </div>
              
              {/* Sidebar Content (Items) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedProducts.length === 0 ? (
                  <p className="text-gray-500 text-center mt-10">Tu carrito está vacío.</p>
                ) : (
                  selectedProducts.map((product) => (
                    <motion.div 
                      key={product.id} 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-100" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                          <p className="text-gray-500 text-xs font-medium mt-1">{product.price} c/u</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-50">
                        <span className="text-sm text-gray-500">Cantidad:</span>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 shadow-sm">
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-sm font-bold transition-all"
                            onClick={() => handleUpdateQuantity(product, -1)}
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-gray-700">
                            {product.quantity}
                          </span>
                          <button 
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-sm font-bold transition-all"
                            onClick={() => handleUpdateQuantity(product, 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Sidebar Footer */}
              {selectedProducts.length > 0 && (
                <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-600 font-medium">Total de artículos:</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {selectedProducts.reduce((acc, p) => acc + p.quantity, 0)}
                    </span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsAppClick}
                    className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-200/50 transition-all flex items-center justify-center gap-3"
                  >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Pedir por WhatsApp
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Productos