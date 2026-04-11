import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedCount, setLoadedCount] = useState(0)
  const videoRefs = useRef([])

  const videos = [
    "https://assets.mixkit.co/videos/15163/15163-720.mp4",
    "https://assets.mixkit.co/videos/14280/14280-720.mp4",
    "https://assets.mixkit.co/videos/906/906-720.mp4",
    "https://assets.mixkit.co/videos/40323/40323-720.mp4",
    "https://assets.mixkit.co/videos/9318/9318-720.mp4"
  ]

  // Contar cuántos videos ya están listos
  const handleVideoLoad = useCallback(() => {
    setLoadedCount(prev => {
      const next = prev + 1;
      if (next >= videos.length) {
        setIsLoading(false);
      }
      return next;
    });
  }, [videos.length])

  // Desactivar loading si por alguna razón falla la carga después de 15 segundos
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 15000);
    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  // Manejar play y pause
  useEffect(() => {
    if (isLoading) return; // No reproducir hasta que termine de cargar

    videoRefs.current.forEach((vid, index) => {
      if (vid) {
        if (index === currentIndex) {
          vid.play().catch(err => console.warn('Play error:', err))
        } else {
          vid.pause()
          vid.currentTime = 0; // Reiniciar para cuando vuelva
        }
      }
    })
  }, [currentIndex, isLoading])

  // Rotación automática cada 9 segundos (solo si ya no está cargando)
  useEffect(() => {
    if (isLoading) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % videos.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [videos.length, isLoading])

  // Progreso de carga en porcentaje
  const progress = Math.round((loadedCount / videos.length) * 100);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeOut" } }}
            className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-black"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6 w-full max-w-sm px-6"
            >
              <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-watercolor-blue via-watercolor-purple to-watercolor-pink bg-clip-text text-transparent mb-4">
                Paradise
              </div>
              
              {/* Círculo que gira */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full mb-2"
              />
              
              {/* Texto de carga */}
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-white/80 text-sm font-light tracking-widest uppercase text-center"
              >
                Cargando Experiencia...
              </motion.span>

              {/* Barra de progreso */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                <motion.div 
                  className="h-full bg-gradient-to-r from-watercolor-blue via-watercolor-purple to-watercolor-pink"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-white/50 text-xs mt-2">{progress}%</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Renderizamos TODOS los videos ocultos para precargarlos */}
      {videos.map((videoSrc, index) => {
        const isActive = currentIndex === index;

        return (
          <motion.div
            key={videoSrc}
            className="absolute inset-0 w-full h-full"
            initial={false}
            animate={{ 
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 1.05,
              zIndex: isActive ? 10 : 0
            }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <video
              ref={el => videoRefs.current[index] = el}
              src={videoSrc}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              onCanPlay={handleVideoLoad}
              onError={handleVideoLoad} // En caso de error, avanzar el contador para no quedarse trabado
            />
          </motion.div>
        )
      })}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/15 z-20 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] z-20 pointer-events-none" />
    </div>
  )
}

export default VideoSlider