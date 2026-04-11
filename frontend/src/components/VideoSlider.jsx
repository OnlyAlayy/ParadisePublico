import React, { useState, useEffect, useRef, useMemo } from 'react'

const SLIDES = [
  {
    video: "/videos/mixkit-children-painting-with-their-fingers-15163-hd-ready.mp4",
    poster: "/videos/mixkit-children-painting-with-their-fingers-15163-hd-ready.jpg"
  },
  {
    video: "/videos/mixkit-mother-helps-to-paint-her-daughter-with-watercolor-14280-hd-ready.mp4",
    poster: "/videos/mixkit-mother-helps-to-paint-her-daughter-with-watercolor-14280-hd-ready.jpg"
  },
  {
    video: "/videos/mixkit-orange-paint-on-a-mural-906-hd-ready.mp4",
    poster: "/videos/mixkit-orange-paint-on-a-mural-906-hd-ready.jpg"
  },
  {
    video: "/videos/mixkit-detail-view-of-a-painting-being-painted-40323-hd-ready.mp4",
    poster: "/videos/mixkit-detail-view-of-a-painting-being-painted-40323-hd-ready.jpg"
  },
  {
    video: "/videos/mixkit-painting-with-watercolor-with-a-brush-9318-hd-ready.mp4",
    poster: "/videos/mixkit-painting-with-watercolor-with-a-brush-9318-hd-ready.jpg"
  }
]

// Detectar mobile una sola vez
const isMobile = typeof window !== 'undefined' && (
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768
)

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const videoRef = useRef(null)

  // --- Rotación automática cada 9s ---
  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false) // inicia fade out
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % SLIDES.length)
        setFade(true) // fade in del nuevo
      }, 600)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  // --- En desktop: reproducir el video cuando cambia el index ---
  useEffect(() => {
    if (isMobile) return
    const vid = videoRef.current
    if (!vid) return
    vid.src = SLIDES[currentIndex].video
    vid.load()
    vid.play().catch(() => {})
  }, [currentIndex])

  const currentSlide = SLIDES[currentIndex]

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* ====== CONTENIDO: 1 solo elemento, video en desktop, imagen en mobile ====== */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out'
        }}
      >
        {isMobile ? (
          <img
            src={currentSlide.poster}
            alt="Paradise taller de arte"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            muted
            playsInline
            poster={currentSlide.poster}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* ====== OVERLAYS ====== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/15 z-20 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] z-20 pointer-events-none" />
    </div>
  )
}

export default VideoSlider