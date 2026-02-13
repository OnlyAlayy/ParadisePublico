import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const RealisticBrushStrokes = ({ 
  section = "features", 
  intensity = "medium",
  positions = null
}) => {
  const { scrollY } = useScroll();
  
  // Transformaciones optimizadas - TODOS LOS HOOKS AL PRINCIPIO
  const rotation1 = useTransform(scrollY, [0, 1000], [0, 8]);
  const rotation2 = useTransform(scrollY, [0, 1000], [0, -6]);
  const rotation3 = useTransform(scrollY, [0, 1000], [0, 10]);
  const float1 = useTransform(scrollY, [0, 800], [0, -15]);
  const float2 = useTransform(scrollY, [0, 800], [0, 12]);
  const float3 = useTransform(scrollY, [0, 800], [0, -8]);

  // HOOKS ADICIONALES PARA TODOS LOS TRAZOS POSIBLES
  const float4 = useTransform(scrollY, [0, 800], [0, 10]);
  const rotation4 = useTransform(scrollY, [0, 1000], [0, -5]);
  const float5 = useTransform(scrollY, [0, 800], [0, -8]);
  const rotation5 = useTransform(scrollY, [0, 1000], [0, 7]);
  const float6 = useTransform(scrollY, [0, 800], [0, 12]);
  const rotation6 = useTransform(scrollY, [0, 1000], [0, -8]);
  const float7 = useTransform(scrollY, [0, 800], [0, -10]);
  const rotation7 = useTransform(scrollY, [0, 1000], [0, 15]);
  const float8 = useTransform(scrollY, [0, 800], [0, 5]);
  const rotation8 = useTransform(scrollY, [0, 1000], [0, -12]);
  const float9 = useTransform(scrollY, [0, 800], [0, -8]);
  const rotation9 = useTransform(scrollY, [0, 1000], [0, 10]);
  const float10 = useTransform(scrollY, [0, 800], [0, 7]);
  const rotation10 = useTransform(scrollY, [0, 1000], [0, -7]);
  
  // Hooks para trazos pequeños
  const smallFloat1 = useTransform(scrollY, [0, 600], [0, -5]);
  const smallRotation1 = useTransform(scrollY, [0, 800], [0, 3]);
  const smallFloat2 = useTransform(scrollY, [0, 600], [0, 7]);
  const smallRotation2 = useTransform(scrollY, [0, 800], [0, -4]);

  // Intensidad de opacidad basada en la prop
  const opacityLevels = {
    light: 0.4,
    medium: 0.6,
    strong: 0.8
  }

  const baseOpacity = opacityLevels[intensity] || opacityLevels.medium;

  // Estilo base MEJORADO - Más profesional
  const brushStyle = {
    filter: "blur(2.5px) saturate(1.4)",
    mixBlendMode: "overlay",
    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
  };

  // POSICIONES MANTENIDAS EXACTAMENTE IGUAL
  const defaultPositions = {
    features: {
      1: { top: "5%", left: "3%", width: "28rem", height: "14rem" },
      2: { top: "12%", right: "4%", width: "24rem", height: "11rem" },
      3: { bottom: "15%", left: "8%", width: "22rem", height: "10rem" },
      4: { bottom: "8%", right: "10%", width: "20rem", height: "9rem" },
      5: { top: "45%", left: "50%", width: "18rem", height: "8rem" },
      6: { top: "65%", left: "5%", width: "24rem", height: "11rem" },
      7: { top: "8%", right: "20%", width: "20rem", height: "9rem" },
    },
    gallery: {
      1: { top: "8%", left: "8%", width: "26rem", height: "13rem" },
      2: { top: "5%", right: "5%", width: "24rem", height: "12rem" },
      3: { bottom: "12%", left: "5%", width: "22rem", height: "10rem" },
      4: { bottom: "20%", right: "8%", width: "20rem", height: "9rem" },
      5: { top: "50%", left: "60%", width: "18rem", height: "8rem" },
      6: { top: "70%", left: "3%", width: "28rem", height: "12rem" },
      7: { bottom: "8%", right: "5%", width: "24rem", height: "11rem" },
      8: { top: "15%", left: "45%", width: "22rem", height: "10rem" },
      9: { bottom: "30%", left: "70%", width: "16rem", height: "7rem" },
      10: { top: "35%", right: "70%", width: "20rem", height: "9rem" }
    },
    light: {
      1: { top: "10%", left: "5%", width: "20rem", height: "10rem" },
      2: { bottom: "10%", right: "5%", width: "18rem", height: "8rem" },
      3: { top: "50%", left: "50%", width: "15rem", height: "7rem" }
    }
  };

  // Usar posiciones personalizadas si se proporcionan, sino usar las por defecto
  const currentPositions = positions || defaultPositions[section] || defaultPositions.features;

  // Determinar si estamos usando posiciones personalizadas
  const isCustomPositions = positions !== null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* TRAZO 1 - Púrpura principal */}
      <motion.div
        style={{ 
          y: float1, 
          rotate: rotation1,
          ...currentPositions[1]
        }}
        className="absolute"
      >
        <div
          style={{
            ...brushStyle,
            background: "linear-gradient(135deg, rgba(147,51,234,0.6) 0%, rgba(192,132,252,0.4) 50%, rgba(216,180,254,0.2) 100%)",
            transform: "rotate(-8deg)",
            opacity: baseOpacity,
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* TRAZO 2 - Azul */}
      <motion.div
        style={{ 
          y: float2, 
          rotate: rotation2,
          ...currentPositions[2]
        }}
        className="absolute"
      >
        <div
          style={{
            ...brushStyle,
            background: "linear-gradient(135deg, rgba(59,130,246,0.6) 0%, rgba(96,165,250,0.4) 50%, rgba(147,197,253,0.2) 100%)",
            transform: "rotate(12deg)",
            opacity: baseOpacity,
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* TRAZO 3 - Rosa */}
      <motion.div
        style={{ 
          y: float3, 
          rotate: rotation3,
          ...currentPositions[3]
        }}
        className="absolute"
      >
        <div
          style={{
            ...brushStyle,
            background: "linear-gradient(135deg, rgba(236,72,153,0.6) 0%, rgba(244,114,182,0.4) 50%, rgba(249,168,212,0.2) 100%)",
            transform: "rotate(-15deg)",
            opacity: baseOpacity,
          }}
          className="w-full h-full"
        />
      </motion.div>

      {/* Solo renderizar trazos adicionales si no es la versión light O si son posiciones personalizadas */}
      {(section !== "light" || isCustomPositions) && currentPositions[4] && (
        <>
          {/* TRAZO 4 - Amarillo */}
          <motion.div
            style={{ 
              y: float4, 
              rotate: rotation4,
              ...currentPositions[4]
            }}
            className="absolute"
          >
            <div
              style={{
                ...brushStyle,
                background: "linear-gradient(135deg, rgba(245,158,11,0.6) 0%, rgba(251,191,36,0.4) 50%, rgba(253,230,138,0.2) 100%)",
                transform: "rotate(18deg)",
                opacity: baseOpacity,
              }}
              className="w-full h-full"
            />
          </motion.div>

          {/* TRAZO 5 - Púrpura secundario */}
          {currentPositions[5] && (
            <motion.div
              style={{ 
                y: float5, 
                rotate: rotation5,
                ...currentPositions[5]
              }}
              className="absolute"
            >
              <div
                style={{
                  ...brushStyle,
                  background: "linear-gradient(135deg, rgba(168,85,247,0.6) 0%, rgba(192,132,252,0.4) 50%, rgba(216,180,254,0.2) 100%)",
                  transform: "rotate(-25deg)",
                  opacity: baseOpacity,
                }}
                className="w-full h-full"
              />
            </motion.div>
          )}
        </>
      )}

      {/* TRAZOS ADICIONALES PARA FEATURES O POSICIONES PERSONALIZADAS */}
      {(section === "features" || isCustomPositions) && currentPositions[6] && currentPositions[7] && (
        <>
          {/* TRAZO 6 - Verde agua */}
          <motion.div
            style={{ 
              y: float6, 
              rotate: rotation6,
              ...currentPositions[6]
            }}
            className="absolute"
          >
            <div
              style={{
                ...brushStyle,
                background: "linear-gradient(135deg, rgba(34,197,94,0.5) 0%, rgba(134,239,172,0.3) 50%, rgba(220,252,231,0.15) 100%)",
                transform: "rotate(22deg)",
                opacity: baseOpacity - 0.05,
                mixBlendMode: "soft-light",
              }}
              className="w-full h-full"
            />
          </motion.div>

          {/* TRAZO 7 - Naranja */}
          <motion.div
            style={{ 
              y: float7, 
              rotate: rotation7,
              ...currentPositions[7]
            }}
            className="absolute"
          >
            <div
              style={{
                ...brushStyle,
                background: "linear-gradient(135deg, rgba(249,115,22,0.55) 0%, rgba(251,146,60,0.35) 50%, rgba(254,215,170,0.18) 100%)",
                transform: "rotate(-18deg)",
                opacity: baseOpacity - 0.1,
                mixBlendMode: "overlay",
              }}
              className="w-full h-full"
            />
          </motion.div>
        </>
      )}

      {/* TRAZOS ADICIONALES PARA GALLERY */}
      {section === "gallery" && (
        <>
          {/* TRAZO 8 - Azul claro */}
          {currentPositions[8] && (
            <motion.div
              style={{ 
                y: float8, 
                rotate: rotation8,
                ...currentPositions[8]
              }}
              className="absolute"
            >
              <div
                style={{
                  ...brushStyle,
                  background: "linear-gradient(135deg, rgba(14,165,233,0.48) 0%, rgba(125,211,252,0.28) 50%, rgba(186,230,253,0.12) 100%)",
                  transform: "rotate(30deg)",
                  opacity: baseOpacity - 0.15,
                  mixBlendMode: "color-dodge",
                }}
                className="w-full h-full"
              />
            </motion.div>
          )}

          {/* TRAZO 9 - Rosa suave */}
          {currentPositions[9] && (
            <motion.div
              style={{ 
                y: float9, 
                rotate: rotation9,
                ...currentPositions[9]
              }}
              className="absolute"
            >
              <div
                style={{
                  ...brushStyle,
                  background: "linear-gradient(135deg, rgba(244,114,182,0.45) 0%, rgba(249,168,212,0.28) 50%, rgba(252,231,243,0.12) 100%)",
                  transform: "rotate(-15deg)",
                  opacity: baseOpacity - 0.12,
                  mixBlendMode: "lighten",
                }}
                className="w-full h-full"
              />
            </motion.div>
          )}

          {/* TRAZO 10 - Amarillo suave */}
          {currentPositions[10] && (
            <motion.div
              style={{ 
                y: float10, 
                rotate: rotation10,
                ...currentPositions[10]
              }}
              className="absolute"
            >
              <div
                style={{
                  ...brushStyle,
                  background: "linear-gradient(135deg, rgba(251,191,36,0.42) 0%, rgba(253,230,138,0.25) 50%, rgba(254,243,199,0.1) 100%)",
                  transform: "rotate(25deg)",
                  opacity: baseOpacity - 0.18,
                  mixBlendMode: "overlay",
                }}
                className="w-full h-full"
              />
            </motion.div>
          )}
        </>
      )}

      {/* TRAZOS DEFINIDOS MÁS PEQUEÑOS - MEJORADOS SUTILMENTE */}
      {(section !== "light" || isCustomPositions) && (
        <>
          <motion.div
            style={{
              y: smallFloat1,
              rotate: smallRotation1,
              top: section === "gallery" ? "60%" : "55%",
              right: section === "gallery" ? "25%" : "20%",
              width: section === "gallery" ? "12rem" : "10rem",
              height: section === "gallery" ? "3rem" : "2.5rem",
            }}
            className="absolute"
          >
            <div
              style={{
                filter: "blur(1.5px) saturate(1.5)",
                background: "linear-gradient(90deg, rgba(147,51,234,0.6) 0%, rgba(192,132,252,0.3) 70%, transparent 100%)",
                clipPath: 'polygon(0% 25%, 15% 0%, 75% 15%, 95% 55%, 65% 95%, 5% 75%)',
                transform: 'rotate(45deg)',
                opacity: section === "gallery" ? baseOpacity + 0.05 : baseOpacity,
                mixBlendMode: "overlay",
                borderRadius: "40% 60% 60% 40% / 40% 40% 60% 60%",
              }}
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            style={{
              y: smallFloat2,
              rotate: smallRotation2,
              bottom: section === "gallery" ? "45%" : "40%",
              left: section === "gallery" ? "20%" : "25%",
              width: section === "gallery" ? "10rem" : "8rem",
              height: section === "gallery" ? "2.5rem" : "2rem",
            }}
            className="absolute"
          >
            <div
              style={{
                filter: "blur(1.5px) saturate(1.5)",
                background: "linear-gradient(90deg, rgba(59,130,246,0.6) 0%, rgba(96,165,250,0.3) 70%, transparent 100%)",
                clipPath: 'polygon(0% 35%, 25% 5%, 85% 25%, 100% 65%, 55% 90%, 8% 55%)',
                transform: 'rotate(-30deg)',
                opacity: section === "gallery" ? baseOpacity + 0.05 : baseOpacity,
                mixBlendMode: "overlay",
                borderRadius: "30% 70% 70% 30% / 50% 50% 50% 50%",
              }}
              className="w-full h-full"
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default RealisticBrushStrokes;