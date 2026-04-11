import React, { useState, useEffect, useRef } from 'react'

const SLIDE_SOURCES = [
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

const VideoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRefs = useRef([])
  const blobsAssigned = useRef(false)

  // --- 1) Descargar videos como blobs y asignarlos UNA SOLA VEZ ---
  useEffect(() => {
    if (blobsAssigned.current) return
    blobsAssigned.current = true

    const assignBlobs = async () => {
      for (let i = 0; i < SLIDE_SOURCES.length; i++) {
        const vid = videoRefs.current[i]
        if (!vid) continue
        try {
          const res = await fetch(SLIDE_SOURCES[i].video)
          const blob = await res.blob()
          vid.src = URL.createObjectURL(blob)
          if (i === 0) vid.play().catch(() => {})
        } catch {
          vid.src = SLIDE_SOURCES[i].video
          if (i === 0) vid.play().catch(() => {})
        }
      }
    }
    assignBlobs()
  }, [])

  // --- 2) Play/Pause según el index actual ---
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i === currentIndex) {
        vid.currentTime = 0
        vid.play().catch(() => {})
      } else {
        vid.pause()
      }
    })
  }, [currentIndex])

  // --- 3) Rotación automática cada 9s ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % SLIDE_SOURCES.length)
    }, 9000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {SLIDE_SOURCES.map((slide, index) => (
        <div
          key={slide.video}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: index === currentIndex ? 10 : 0
          }}
        >
          <video
            ref={el => { videoRefs.current[index] = el }}
            muted
            playsInline
            poster={slide.poster}
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* ====== OVERLAYS ====== */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30 z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 to-black/15 z-20 pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.2)] z-20 pointer-events-none" />
    </div>
  )
}

export default VideoSlider