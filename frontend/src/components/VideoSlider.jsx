import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [visited, setVisited] = useState(new Set([0]))
  const videoRefs = useRef([])

  const videos = [
    "https://assets.mixkit.co/videos/15163/15163-720.mp4",
    "https://assets.mixkit.co/videos/14280/14280-720.mp4",
    "https://assets.mixkit.co/videos/906/906-720.mp4",
    "https://assets.mixkit.co/videos/40323/40323-720.mp4",
    "https://assets.mixkit.co/videos/9318/9318-720.mp4"
  ]

  // Actualizar los videos visitados
  useEffect(() => {
    setVisited(prev => {
      const next = new Set(prev)
      next.add(currentIndex)
      return next
    })
  }, [currentIndex])

  // Manejar play y pause de los videos en el DOM
  useEffect(() => {
    videoRefs.current.forEach((vid, index) => {
      if (vid) {
        if (index === currentIndex) {
          vid.play().catch(err => console.warn('Play error:', err))
        } else {
          vid.pause()
        }
      }
    })
  }, [currentIndex])

  // Rotación automática cada 9 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % videos.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [videos.length])

  const handleVideoLoad = useCallback((index) => {
    if (index === 0) {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-3 border-white/40 border-t-white rounded-full border-t-transparent"
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-sm font-light tracking-wide animate-pulse"
              >
                Cargando lienzo...
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Renderizamos videos individualmente y los guardamos en el DOM para NO recargar */}
      {videos.map((videoSrc, index) => {
        const isActive = currentIndex === index;
        const hasBeenVisited = visited.has(index);

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
            {hasBeenVisited && (
               <video
                 ref={el => videoRefs.current[index] = el}
                 src={videoSrc}
                 muted
                 loop
                 playsInline
                 preload={index === 0 ? "auto" : "metadata"}
                 className="absolute inset-0 w-full h-full object-cover"
                 onCanPlay={() => handleVideoLoad(index)}
                 onError={() => {
                   if (index === 0) setIsLoading(false);
                 }}
               />
            )}
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