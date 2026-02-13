import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Esto es LO MÁS IMPORTANTE para SPA con React Router
    middlewareMode: false,
    // Configuración específica para SPA
    historyApiFallback: {
      disableDotRule: true,
      index: '/index.html'
    },
    fs: {
      strict: false
    }
  },
  build: {
    rollupOptions: {
      input: '/index.html'
    },
    // Esta línea es CRUCIAL
    outDir: 'dist'
  }
})