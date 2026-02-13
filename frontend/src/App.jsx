// src/App.jsx - VERSIÓN FINAL CON FUTURE FLAGS
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Historia from './pages/Historia'
import Inscripcion from './pages/inscripcion'
import Productos from './pages/Productos'
import Contacto from './pages/Contacto'
import Recuerdos from './pages/Recuerdos'
import RecuerdoDetalle from './pages/RecuerdosDetalle'
import AdminRecuerdos from './pages/AdminRecuerdos'
import BackgroundAnimation from './components/BackgroundAnimation'
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen bg-white relative overflow-hidden">
        <BackgroundAnimation />
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/inscripcion" element={<Inscripcion />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/recuerdos" element={<Recuerdos />} />
            <Route path="/recuerdos/:id" element={<RecuerdoDetalle />} />
            
            {/* RUTA PROTEGIDA */}
            <Route
              path="/admin/recuerdos"
              element={
                <ProtectedRoute>
                  <AdminRecuerdos />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  )
}

export default App