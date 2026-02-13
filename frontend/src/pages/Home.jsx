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

// Componentes pesados con Lazy Loading
const VideoSlider = lazy(() => import('../components/VideoSlider'))
const RealisticBrushStrokes = lazy(() => import('../components/ui/RealisticBrushStrokes'))
const PaintBrushCursor = lazy(() => import('../components/ui/PaintBrushCursor'))
const CTAParticles = lazy(() => import('../components/ui/CTAParticles'))
const SubtleDecorations = lazy(() => import('../components/ui/SubtleDecorations'))

const Home = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const features = [
    {
      icon: <FaPalette className="text-3xl md:text-4xl text-watercolor-purple" />,
      title: "Clases Personalizadas",
      description: "Atención individualizada para cada niño según su nivel y intereses"
    },
    {
      icon: <FaUsers className="text-3xl md:text-4xl text-watercolor-blue" />,
      title: "Grupos Reducidos",
      description: "Máximo 8 alumnos por clase para garantizar la mejor experiencia"
    },
    {
      icon: <FaStar className="text-3xl md:text-4xl text-watercolor-yellow" />,
      title: "Primera Clase Gratis",
      description: "Ven a probar sin compromiso y descubre el talento de tu hijo"
    },
    {
      icon: <FaChild className="text-3xl md:text-4xl text-watercolor-pink" />,
      title: "Para todas las edades",
      description: "De 4 a 13 años, adaptamos las actividades a cada etapa"
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
              <FeatureCard
                key={index}
                index={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                isMobile={isMobile}
              />
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