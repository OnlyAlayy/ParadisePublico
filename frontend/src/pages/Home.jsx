import React, { useRef, lazy, Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPalette, FaUsers, FaStar, FaChild, FaArrowDown } from 'react-icons/fa'

// Importar componentes críticos inmediatamente
import SectionWrapper from '../components/layout/SectionWrapper'
import HeroTitle from '../components/ui/HeroTitle'
import AnimatedButton from '../components/ui/AnimatedButton'
import FeatureCard from '../components/ui/FeatureCard'
import GalleryItem from '../components/ui/GalleryItem'
import Obra1 from '../assets/obra1.jpg'
import Obra2 from '../assets/obra2.jpg'
import Obra3 from '../assets/obra3.jpg'
import Obra4 from '../assets/obra4.jpg'
import Obra5 from '../assets/obra5.jpg'
import Obra6 from '../assets/obra6.jpg'
import Obra7 from '../assets/obra7.jpg'
import Obra8 from '../assets/obra8.jpg'

import students from '../assets/svgs/entrance-ceremony-elementary-school-students-svgrepo-com.svg'
import pencilcase from '../assets/svgs/pencil-case-svgrepo-com.svg'
import nomoney from '../assets/svgs/no-money-poverty-budget-poor-cash-svgrepo-com.svg'
import pintando from '../assets/svgs/pintando.png'


// Componentes pesados con Lazy Loading
const VideoSlider = lazy(() => import('../components/VideoSlider'))
const RealisticBrushStrokes = lazy(() => import('../components/ui/RealisticBrushStrokes'))
const PaintBrushCursor = lazy(() => import('../components/ui/PaintBrushCursor'))
const CTAParticles = lazy(() => import('../components/ui/CTAParticles'))
const SubtleDecorations = lazy(() => import('../components/ui/SubtleDecorations'))

const DecorativeArrow = () => (
  <svg 
    width="80" 
    height="253" 
    viewBox="0 0 97 253" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="w-16 md:w-24 h-auto text-gray-400/60" // Ajusta el tamaño aquí si lo ves muy grande
  >
    <path d="M8.45841 13.7344C15.4852 5.21795 33.253 -7.87604 48.1097 7.87933C62.9663 23.6347 42.9232 53.1228 31.0446 65.8974C25.1889 69.4459 12.9756 75.4784 10.968 71.2202C8.4584 65.8974 6.95266 54.7196 27.5312 45.1387C40.7482 39.461 69.2904 33.4286 77.7226 54.7196C81.5706 63.9457 82.2398 85.3787 54.1326 97.3017L18.9986 112.738M18.9986 112.738C5.61422 113.274 -13.6258 106.892 16.489 77.0752C26.0254 72.4621 49.1135 63.1296 65.1748 62.7038C74.3766 64.6554 92.0774 74.3074 89.2667 97.3017C89.6013 101.915 83.3441 113.376 55.6384 122.319C49.2808 123.738 35.0599 126.683 29.037 127.109L7.45463 130.303L18.9986 112.738ZM18.9986 112.738C27.7811 110.254 48.5087 106.031 61.1595 109.012C76.9729 112.738 83.2437 109.544 95.7916 130.303C97.9666 140.948 96.3939 162.772 72.7035 164.901C49.0132 167.03 33.7215 162.949 29.037 160.643V140.948M29.037 140.948C46.2694 142.545 83.2437 141.374 93.282 123.915C98.1339 111.496 98.5019 86.1239 61.1595 83.9948C52.125 84.3496 32.8515 85.4852 28.0331 87.1884L29.037 124.98C46.604 126.577 83.5449 134.135 90.7724 151.594C94.6205 161.707 95.892 182.998 70.1939 187.256C60.6576 187.611 39.0753 186.298 29.037 178.208M29.037 140.948V178.208M29.037 140.948C39.9118 143.61 63.8698 150.955 72.7035 159.046C83.411 167.917 99.1042 189.918 76.2169 206.95C69.0228 209.612 49.9165 211.741 31.0446 198.966M29.037 178.208L31.0446 198.966M29.037 178.208C41.0829 186.724 65.6767 207.376 67.6844 221.854C68.5209 230.725 66.2791 249.213 50.6193 252.194C46.604 252.904 36.6661 252.833 29.037 246.871L31.0446 198.966" stroke="#84829A"/>
  </svg>
)


const Home = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const features = [
    {
      icon: <img src={pencilcase} alt="casepencil" className="w-12 h-12 text-purple-500" />,
      title: "Clases Personalizadas",
      description: "Atención individualizada para cada niño según su nivel y intereses"
    },
    {
      icon: <img src={students} alt="students" className="w-12 h-12 text-purple-500" />,
      title: "Grupos Reducidos",
      description: "Máximo 8 alumnos por clase para garantizar la mejor experiencia"
    },
    {
      icon: <img src={nomoney} alt="free" className="w-12 h-12 text-purple-500" />,
      title: "Primera Clase Gratis",
      description: "Ven a probar sin compromiso y descubre el talento de tu hijoㅤㅤㅤㅤㅤ"
    },
    {
      icon: <img src={pintando} alt="painting" className="w-12 h-12 text-purple-500" />,
      title: "Primera Clase Gratis",
      title: "Para todas las edades",
      description: "De 4 a 13 años, adaptamos las actividades a cada etapaㅤㅤㅤㅤ"
    }
  ]

  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)

  // Detectar si es móvil y dispositivo táctil
  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768
    }
    
    const checkTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0))
    }
    
    setIsMobile(checkMobile())
    setIsTouchDevice(checkTouchDevice())

    // Listener para cambios de tamaño
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Animaciones optimizadas para móvil
  const getAnimationProps = (baseProps = {}) => {
    if (isMobile) {
      return {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
      }
    }
    return baseProps
  }

  // Fallback simple para loading
  const SimpleFallback = () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-watercolor-purple">Cargando...</div>
    </div>
  )

  return (
    <div className={`relative overflow-hidden ${isTouchDevice ? 'cursor-auto' : 'cursor-none'}`}>
      {/* Solo cargar cursor en dispositivos no táctiles y no móviles */}
      {!isTouchDevice && !isMobile && (
        <Suspense fallback={null}>
          <PaintBrushCursor />
        </Suspense>
      )}
      
      {/* Sección Hero - SIEMPRE mostrar VideoSlider */}
      <SectionWrapper ref={heroRef} className="relative min-h-screen">
        <Suspense fallback={<SimpleFallback />}>
          <VideoSlider />
        </Suspense>
        
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 via-black/10 to-transparent">
          <motion.div
            {...getAnimationProps({
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, ease: "easeOut" }
            })}
            className="text-center text-white px-4"
          >
            <HeroTitle />

            {/* Frase simplificada */}
            <motion.div
              className="mb-8 md:mb-12 max-w-2xl mx-auto"
              {...getAnimationProps({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.5, ease: "easeOut" }
              })}
            >
              <motion.p
                className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light text-white/95 drop-shadow-lg"
                {...getAnimationProps({
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 1, delay: 0.7 }
                })}
              >
                Donde la creatividad de los niños cobra vida
              </motion.p>
            </motion.div>

            {/* Botón */}
            <motion.div
              {...getAnimationProps({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.8, ease: "easeOut" }
              })}
            >
              <AnimatedButton to="/inscripcion" variant="primary">
                <FaPalette className="text-lg" />
                Descubre el Arte
              </AnimatedButton>
            </motion.div>

            {/* Flecha indicadora solo en desktop */}
            {!isMobile && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <FaArrowDown className="text-white text-lg opacity-80" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Solo decoraciones en desktop */}
        {!isMobile && (
          <Suspense fallback={null}>
            <SubtleDecorations />
          </Suspense>
        )}
      </SectionWrapper>

      {/* Sección Features - SIEMPRE mostrar esta sección */}
      <SectionWrapper ref={featuresRef} className="py-12 md:py-20 bg-white relative">
        {/* Solo trazos de pincel en desktop */}
        {!isMobile && (
          <Suspense fallback={null}>
            <SubtleDecorations />
            <RealisticBrushStrokes section="features" />
          </Suspense>
        )}
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            {...getAnimationProps({
              initial: { opacity: 0, y: 40 },
              whileInView: { opacity: 1, y: 0 },
              transition: { duration: 0.7, ease: "easeOut" }
            })}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 tracking-tight"
              {...getAnimationProps({
                initial: { opacity: 0, scale: isMobile ? 1 : 0.95 },
                whileInView: { opacity: 1, scale: 1 },
                transition: { duration: 0.6, ease: "easeOut" }
              })}
            >
              <span className="bg-gradient-to-r from-watercolor-blue via-watercolor-purple to-watercolor-pink bg-clip-text text-transparent drop-shadow-sm">
                ¿Por qué elegir Paradise?
              </span>
            </motion.h2>
            <motion.p
              className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light"
              {...getAnimationProps({
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
              })}
            >
              Un espacio donde la creatividad florece y los niños descubren el maravilloso mundo del arte
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              // IMPORTANTE: El div contenedor debe ser 'relative'
              <div key={index} className="relative group">
                <FeatureCard
                  index={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  isMobile={isMobile}
                />
                
                {/* Condición: Solo si es el último (index === features.length - 1) */}
                {index === features.length - 1 && (
                  <div className="absolute -bottom-4 -right-12 md:-right-17 -z-10 pointer-events-none hidden md:block">
                  <DecorativeArrow />
                </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Sección Gallery */}
        <SectionWrapper className="py-12 md:py-20 bg-white relative">
          {/* Solo trazos de pincel en desktop */}
          {!isMobile && (
            <Suspense fallback={null}>
              <RealisticBrushStrokes section="gallery" />
            </Suspense>
          )}
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              {...getAnimationProps({
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.8, ease: "easeOut" }
              })}
              className="text-center mb-12 md:mb-16"
            >
              <motion.h2
                className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-watercolor-blue via-watercolor-purple to-watercolor-pink bg-clip-text text-transparent mb-4 md:mb-6 tracking-tight drop-shadow-sm"
                {...getAnimationProps({
                  initial: { opacity: 0, scale: isMobile ? 1 : 0.95 },
                  whileInView: { opacity: 1, scale: 1 },
                  transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
                })}
              >
                Nuestras Creaciones
              </motion.h2>
              <motion.p
                className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light"
                {...getAnimationProps({
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.4, ease: "easeOut" }
                })}
              >
                Descubre las maravillosas obras de arte creadas por nuestros pequeños artistas
              </motion.p>
            </motion.div>

            {/* Galería con imágenes reales - USANDO LAS VARIABLES IMPORTADAS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {[
                Obra1,
                Obra2, 
                Obra3,
                Obra4,
                Obra5,
                Obra6,
                Obra7,
                Obra8
              ].map((image, index) => (
                <div key={index} className={isMobile ? "static" : ""}>
                  <GalleryItem 
                    index={index}
                    image={image}
                    isMobile={isMobile}
                  />
                </div>
              ))}
            </div>

            {/* CTA para ver más creaciones */}
            <motion.div
              {...getAnimationProps({
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.8, ease: "easeOut" }
              })}
              className="text-center mt-12 md:mt-16"
            >
              <AnimatedButton to="/recuerdos" variant="secondary">
                {isMobile ? (
                  "Ver más creaciones"
                ) : (
                  <motion.span
                    initial={{ backgroundPosition: "0% 50%" }}
                    whileHover={{ backgroundPosition: "100% 50%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-watercolor-purple to-watercolor-pink bg-clip-text text-transparent bg-size-200 bg-pos-0 font-bold"
                  >
                    Ver más creaciones
                  </motion.span>
                )}
              </AnimatedButton>

              {/* Cita inspiradora - Simplificada en móvil */}
              <motion.div
                {...getAnimationProps({
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 1, ease: "easeOut" }
                })}
                className="text-center mt-8 md:mt-12"
              >
                <div className="relative inline-block">
                  <motion.p
                    className={`text-base md:text-lg text-gray-800 italic leading-relaxed font-medium bg-white/95 backdrop-blur-lg px-6 md:px-8 py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/90 shadow-lg md:shadow-2xl ${
                      isMobile ? 'backdrop-blur-md' : ''
                    }`}
                    {...getAnimationProps({
                      initial: { opacity: 0 },
                      whileInView: { opacity: 1 },
                      transition: { duration: 0.8, delay: 1.2 }
                    })}
                  >
                    "Cada obra de arte cuenta una historia única de imaginación y creatividad"
                  </motion.p>
                  {!isMobile && (
                    <>
                      <motion.div
                        className="absolute -top-2 -left-2 text-2xl md:text-3xl text-watercolor-yellow opacity-80"
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                      >
                        "
                      </motion.div>
                      <motion.div
                        className="absolute -bottom-2 -right-2 text-2xl md:text-3xl text-watercolor-yellow opacity-80"
                        initial={{ scale: 0, rotate: 45 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                      >
                        "
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper ref={ctaRef} className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-r from-watercolor-blue to-watercolor-purple">
        {/* Solo particles en desktop */}
        {!isMobile && (
          <Suspense fallback={null}>
            <CTAParticles />
          </Suspense>
        )}
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            {...getAnimationProps({
              initial: { opacity: 0, scale: isMobile ? 1 : 0.98 },
              whileInView: { opacity: 1, scale: 1 },
              transition: { duration: 0.8, ease: "easeOut" }
            })}
          >
            <motion.h2
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg"
              {...getAnimationProps({
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, ease: "easeOut" }
              })}
            >
              ¿Listo para comenzar?
            </motion.h2>
            <motion.p
              className="text-base md:text-xl text-white/95 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed font-light"
              {...getAnimationProps({
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2, ease: "easeOut" }
              })}
            >
              Inscríbete hoy y recibe tu primera clase totalmente gratis
            </motion.p>
            <motion.div
              {...getAnimationProps({
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4, ease: "easeOut" }
              })}
            >
              <AnimatedButton 
                to="/inscripcion" 
                variant="cta" 
                className="px-6 md:px-10 py-3 md:py-5 text-lg md:text-xl font-bold"
              >
                ¡Quiero Inscribirme!
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  )
}

export default Home