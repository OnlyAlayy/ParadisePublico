import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PaintBrushCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar móvil de manera más robusta
    const checkMobile = () => {
      return (
        typeof window !== 'undefined' && 
        (window.innerWidth <= 768 || 
         ('ontouchstart' in window) ||
         (navigator.maxTouchPoints > 0) ||
         (navigator.msMaxTouchPoints > 0))
      );
    };
    
    setIsMobile(checkMobile());
    
    // Si es móvil, no hacer nada más
    if (checkMobile()) {
      document.body.style.cursor = 'auto';
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      const isInteractive = 
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest("[onclick]") ||
        target.closest("[tabindex]") ||
        target.hasAttribute("href") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA";

      setIsPointer(isInteractive);
    };

    const handleMouseLeave = () => {
      setIsPointer(false);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter, true);
    document.addEventListener("mouseout", handleMouseLeave, true);

    if (isVisible && !isPointer) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter, true);
      document.removeEventListener("mouseout", handleMouseLeave, true);
      document.body.style.cursor = "auto";
    };
  }, [isPointer, isVisible, isMobile]);

  // No renderizar en móviles
  if (isMobile) return null;

  if (isPointer || !isVisible) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
      animate={{ 
        rotate: [0, 5, 0],
        y: [0, -2, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <svg
        width="35"
        height="35"
        viewBox="0 0 58.002 58.002"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        <g>
          <polygon fill="#F2ECBF" points="22.807,31.992 18.772,36.443 20.113,37.784 24.355,33.541 "></polygon>
          <polygon fill="#F2ECBF" points="22.234,39.905 24.57,42.241 29.019,38.205 26.476,35.662 "></polygon>
          <path fill="#A31C0A" d="M17.077,45.061c-0.293,0.293-0.677,0.439-1.061,0.439s-0.768-0.146-1.061-0.439 c-0.586-0.586-0.586-1.535,0-2.121l5.157-5.157l-1.17-1.17c-0.076-0.036-0.147-0.077-0.212-0.125l-7.392,8.155 c2.296,0.503,4.013,2.393,4.134,4.814l0.543,0.543l8.554-7.76l-2.336-2.336L17.077,45.061z"></path>
          <path fill="#A31C0A" d="M56.244,4.758c-2.343-2.343-6.142-2.343-8.485,0l-2.828,2.828L22.807,31.992l1.548,1.548 L51.456,6.44c0.586-0.586,1.535-0.586,2.121,0s0.586,1.535,0,2.121L26.476,35.662l2.543,2.543l24.397-22.133l2.828-2.828 C58.587,10.9,58.587,7.101,56.244,4.758z"></path>
          <rect x="19.673" y="38.844" transform="matrix(0.7071 0.7071 -0.7071 0.7071 33.6665 -3.5951)" fill="#1081E0" width="3" height="0"></rect>
          <rect x="21.795" y="33.723" transform="matrix(0.7071 0.7071 -0.7071 0.7071 32.7897 -5.7159)" fill="#FFFFFF" width="3" height="6"></rect>
          <path fill="#CE3929" d="M14.956,45.061c0.293,0.293,0.677,0.439,1.061,0.439s0.768-0.146,1.061-0.439l5.157-5.157 l-2.121-2.121l-5.157,5.157C14.37,43.526,14.37,44.475,14.956,45.061z"></path>
          <path fill="#CE3929" d="M53.577,8.561c0.586-0.586,0.586-1.535,0-2.121s-1.535-0.586-2.121,0L24.355,33.541l2.121,2.121 L53.577,8.561z"></path>
          <path fill="#6C4127" d="M12.436,55.001c-5.103,0-12.436,0-12.436,0s6.016-2.375,6.016-8.083 c0-3.785,2.716-3.917,5.186-3.917h0.415c2.973,0,5.382,2.25,5.382,5.222v0C17,50.88,17.539,55.001,12.436,55.001z"></path>
        </g>
      </svg>

      <motion.div
        className="absolute inset-0 rounded-full bg-blue-400/10 blur-sm"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
        }}
      />
    </motion.div>
  );
};

export default PaintBrushCursor;