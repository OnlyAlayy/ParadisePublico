import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const videos = [
  "https://assets.mixkit.co/videos/15163/15163-720.mp4",
  "https://assets.mixkit.co/videos/14280/14280-720.mp4",
  "https://assets.mixkit.co/videos/906/906-720.mp4",
  "https://assets.mixkit.co/videos/40323/40323-720.mp4",
  "https://assets.mixkit.co/videos/9318/9318-720.mp4"
]

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [displayIndex, setDisplayIndex] = useState(0) // índice que se muestra visualmente (para la transición)
  const activeVideoRef = useRef(null)
  const nextVideoRef = useRef(null)
  const timerRef = useRef(null)
  const hasCalledCanPlay = useRef(new Set()) // evita que onCanPlay cuente doble

  const nextIndex = (currentIndex + 1) % videos.length

  // --- Preloader: solo espera al PRIMER video ---
  const handleFirstVideoReady = useCallback(() => {
    if (!hasCalledCanPlay.current.has(0)) {
      hasCalledCanPlay.current.add(0)
      setIsLoading(false)
    }
  }, [])

  // Fallback: si el primer video tarda más de 8s, entrar igual
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 8000)
    return () => clearTimeout(t)
  }, [])

  // --- Reproducción del video activo ---
  useEffect(() => {
    if (isLoading) return

    const activeVid = activeVideoRef.current
    if (activeVid) {
      // Asegurar que el src coincide con el video actual antes de reproducir
      activeVid.play().catch(() => {})
    }

    // Pausar el video "next" que se está pre-cargando en segundo plano
    const nextVid = nextVideoRef.current
    if (nextVid) {
      nextVid.pause()
    }
  }, [displayIndex, isLoading])

  // --- Rotación automática ---
  useEffect(() => {
    if (isLoading) return

    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % videos.length
        return next
      })
    }, 9000)

    return () => clearInterval(timerRef.current)
  }, [isLoading])

  // Cuando currentIndex cambia, actualizar displayIndex para disparar la animación
  useEffect(() => {
    setDisplayIndex(currentIndex)
  }, [currentIndex])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* ====== PRELOADER ====== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeOut" } }}
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full mb-2"
              />
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-white/80 text-sm font-light tracking-widest uppercase text-center"
              >
                Cargando Experiencia...
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====== VIDEO ACTIVO (visible) ====== */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={displayIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1, zIndex: 10 }}
          exit={{ opacity: 0, scale: 1, zIndex: 5 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <video
            ref={activeVideoRef}
            key={`active-${displayIndex}`}
            src={videos[displayIndex]}
            muted
            loop
            playsInline
            preload="auto"
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
            onCanPlay={displayIndex === 0 ? handleFirstVideoReady : undefined}
          />
        </motion.div>
      </AnimatePresence>

      {/* ====== VIDEO SIGUIENTE (oculto, solo pre-carga) ====== */}
      <div className="absolute inset-0 w-full h-full" style={{ opacity: 0, zIndex: 0, pointerEvents: 'none' }}>
        <video
          ref={nextVideoRef}
          key={`next-${nextIndex}`}
          src={videos[nextIndex]}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* ====== OVERLAYS ====== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/15 z-20 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] z-20 pointer-events-none" />
    </div>
  )
}

export default VideoSlider