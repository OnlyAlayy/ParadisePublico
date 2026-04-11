import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VIDEOS = [
  "https://assets.mixkit.co/videos/15163/15163-720.mp4",
  "https://assets.mixkit.co/videos/14280/14280-720.mp4",
  "https://assets.mixkit.co/videos/906/906-720.mp4",
  "https://assets.mixkit.co/videos/40323/40323-720.mp4",
  "https://assets.mixkit.co/videos/9318/9318-720.mp4"
]

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const videoRefs = useRef([])
  const firstReadyFired = useRef(false)

  const nextIndex = (currentIndex + 1) % VIDEOS.length

  // --- Preloader: solo espera al primer video ---
  const handleCanPlay = useCallback((index) => {
    if (index === 0 && !firstReadyFired.current) {
      firstReadyFired.current = true
      setIsLoading(false)
    }
  }, [])

  // Fallback: máximo 8s de espera
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 8000)
    return () => clearTimeout(t)
  }, [])

  // --- Play/Pause: solo el video actual se reproduce ---
  useEffect(() => {
    if (isLoading) return

    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === currentIndex) {
        vid.play().catch(() => {})
      } else {
        vid.pause()
      }
    })
  }, [currentIndex, isLoading])

  // --- Pre-cargar el próximo video cambiando su preload ---
  useEffect(() => {
    const nextVid = videoRefs.current[nextIndex]
    if (nextVid && nextVid.preload !== 'auto') {
      nextVid.preload = 'auto'
      nextVid.load()
    }
  }, [nextIndex])

  // --- Rotación automática cada 9s ---
  useEffect(() => {
    if (isLoading) return
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % VIDEOS.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [isLoading])

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

      {/* ====== VIDEOS — Los 5 se montan UNA VEZ y NUNCA se destruyen ====== */}
      {VIDEOS.map((src, index) => {
        const isActive = index === currentIndex
        const isNext = index === nextIndex

        return (
          <motion.div
            key={src}  /* KEY ESTABLE = nunca se desmonta */
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
              ref={el => { videoRefs.current[index] = el }}
              src={src}
              muted
              loop
              playsInline
              preload={index === 0 ? 'auto' : 'none'}
              className="absolute inset-0 w-full h-full object-cover"
              onCanPlay={() => handleCanPlay(index)}
            />
          </motion.div>
        )
      })}

      {/* ====== OVERLAYS ====== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/15 z-20 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] z-20 pointer-events-none" />
    </div>
  )
}

export default VideoSlider