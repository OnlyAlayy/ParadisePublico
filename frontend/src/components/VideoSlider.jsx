import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const VIDEOS = [
  "https://assets.mixkit.co/videos/15163/15163-720.mp4",
  "https://assets.mixkit.co/videos/14280/14280-720.mp4",
  "https://assets.mixkit.co/videos/906/906-720.mp4",
  "https://assets.mixkit.co/videos/40323/40323-720.mp4",
  "https://assets.mixkit.co/videos/9318/9318-720.mp4"
]

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRefs = useRef([])

  const nextIndex = (currentIndex + 1) % VIDEOS.length

  // --- Play/Pause: solo el video actual se reproduce ---
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === currentIndex) {
        vid.play().catch(() => {})
      } else {
        vid.pause()
      }
    })
  }, [currentIndex])

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
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % VIDEOS.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* ====== VIDEOS — Los 5 se montan UNA VEZ y NUNCA se destruyen ====== */}
      {VIDEOS.map((src, index) => {
        const isActive = index === currentIndex

        return (
          <motion.div
            key={src}
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