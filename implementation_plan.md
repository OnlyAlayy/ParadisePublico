# 🎨 Frontend Visual Polish — Paradise

Mejoras visuales para elevar el sitio de **bueno** a **premium**.

> [!NOTE]
> El sitio actual ya tiene una base sólida (Framer Motion, PaintBrushCursor, watercolor theme). El objetivo es pulir detalles que generen un efecto "WOW" inmediato.

## Análisis del Sitio en Vivo

Basado en screenshots de `taller-paradise.vercel.app`:

| Área | Nota Actual | Problema Principal |
|------|-------------|-------------------|
| **Hero (Home)** | 7/10 | Buen fondo + overlay, pero el título podría tener más presencia |
| **Productos** | 7/10 | Cards funcionales pero les falta profundidad visual |
| **Recuerdos** | 6/10 | Los watercolor blobs son lindos, pero el loader es genérico |
| **Header** | 8/10 | Limpio y profesional, podría tener un efecto glassmorphism más notorio |
| **Footer** | 6/10 | Gris plano, se siente desconectado del tema colorido del sitio |
| **WhatsApp Button** | 7/10 | Funcional pero le falta un glow para destacar más |

---

## Proposed Changes

### 1. Design System — Expanded Tailwind Config

#### [MODIFY] [tailwind.config.js](file:///c:/Users/Anto/OneDrive/Escritorio/Maty/CVS/Paradise/frontend/tailwind.config.js)

Agregar colores faltantes al sistema de diseño (green, red, orange) que ya se usan en el código pero no están definidos, y agregar una fuente decorativa para títulos:

- Agregar `watercolor.green`, `watercolor.red`, `watercolor.orange`
- Agregar `watercolor.cream` como color base para fondos
- Agregar animación `shimmer` para efectos premium en botones
- Agregar `fontFamily.heading` con font cursiva/handwritten (Caveat de Google Fonts)

---

### 2. Header — Glassmorphism Premium

#### [MODIFY] [Header.jsx](file:///c:/Users/Anto/OneDrive/Escritorio/Maty/CVS/Paradise/frontend/src/components/Header.jsx)

- Agregar efecto **glassmorphism mejorado** al header (`bg-white/70 backdrop-blur-xl`)
- Agregar **border inferior sutil** con gradiente watercolor
- Añadir efecto de **scroll-aware header** que cambia background al scrollear (más opaco al bajar)

---

### 3. Footer — Conectar con el Tema

#### [MODIFY] [Footer.jsx](file:///c:/Users/Anto/OneDrive/Escritorio/Maty/CVS/Paradise/frontend/src/components/Footer.jsx)

- Cambiar de `bg-gray-800` plano a un **gradiente oscuro** con tintes del watercolor theme
- Agregar **borde superior** con gradiente watercolor (matching el header)
- Mejorar el hover de íconos sociales con **glow effect**
- Actualizar el año del copyright a dinámico (`new Date().getFullYear()`)

---

### 4. WhatsApp Button — Glow Effect

#### [MODIFY] [WhatsAppButton.jsx](file:///c:/Users/Anto/OneDrive/Escritorio/Maty/CVS/Paradise/frontend/src/components/WhatsAppButton.jsx)

- Agregar **glow ring** animado alrededor del botón (pulse de sombra verde)
- Mejorar la presencia visual del FAB

---

### 5. Home — Hero Title Shimmer

#### [MODIFY] [HeroTitle.jsx](file:///c:/Users/Anto/OneDrive/Escritorio/Maty/CVS/Paradise/frontend/src/components/ui/HeroTitle.jsx)

- Agregar efecto **text-shimmer** al título "Paradise" (brillo que recorre el texto)
- Añadir una **línea decorativa** animada debajo del subtítulo

---

### 6. Productos — Cards Premium

#### [MODIFY] [Productos.jsx](file:///c:/Users/Anto/OneDrive/Escritorio/Maty/CVS/Paradise/frontend/src/pages/Productos.jsx)

- Agregar **hover glow effect** en las cards (sombra con tinte watercolor)
- El botón "Quiero este" debería tener un efecto **shimmer** en hover
- Mejorar el badge "Recomendado" con una micro-animación de pulso

---

### 7. CSS Global — Shimmer & Glow Utilities

#### [MODIFY] [index.css](file:///c:/Users/Anto/OneDrive/Escritorio/Maty/CVS/Paradise/frontend/src/index.css)

- Agregar import de Google Font **Caveat** para títulos decorativos
- Agregar utilidades CSS: `.shimmer-text`, `.glow-green`, `.glow-purple`
- Agregar animación `@keyframes shimmer` y `@keyframes glow-pulse`

---

## Resumen de Impacto

| Cambio | Efecto |
|--------|--------|
| Tailwind config completo | Elimina colores faltantes, consistency |
| Header glassmorphism + scroll | Se siente premium y vivo |
| Footer con gradiente | Unifica la identidad visual |
| WhatsApp glow | Destaca el CTA principal de contacto |
| Hero shimmer | Primer impacto visual "WOW" |
| Productos hover glow | Interactividad premium |

> [!IMPORTANT]
> Estos cambios son **puramente visuales/CSS** — no afectan la lógica de negocio ni la estructura de datos. Son seguros para producción.

## Verification Plan

### Browser Testing
- Verificar cada página en el browser después de los cambios
- Capturar screenshots de antes/después

### Responsive
- Verificar en viewport 375px (mobile) y 1366px (desktop)
