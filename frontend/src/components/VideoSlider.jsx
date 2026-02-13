import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef(null)

  const videos = [
    "https://assets.mixkit.co/videos/15163/15163-720.mp4",
    "https://assets.mixkit.co/videos/14280/14280-720.mp4",
    "https://assets.mixkit.co/videos/906/906-720.mp4",
    "https://assets.mixkit.co/videos/40323/40323-720.mp4",
    "https://assets.mixkit.co/videos/9318/9318-720.mp4"
  ]

  // Precargar metadata del video actual
  useEffect(() => {
    videoRef.current?.load()
  }, [currentIndex])

  // Rotación automática cada 9 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % videos.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleVideoError = useCallback(() => {
    console.warn('Error cargando video, pasando al siguiente')
    setCurrentIndex(prev => (prev + 1) % videos.length)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-8 h-8 border-3 border-white/40 border-t-white rounded-full"
              />
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-sm font-light"
              >
                Cargando momentos creativos...
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.video
            ref={videoRef}
            src={videos[currentIndex]}
            preload="metadata"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/15" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)]" />
    </div>
  )
}

export default VideoSlider