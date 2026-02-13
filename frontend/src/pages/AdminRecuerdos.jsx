import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';

// Componentes SVG para íconos (mantener igual)
const SvgIcons = {
  calendar: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  filter: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  ),
  camera: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  plus: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  arrowLeft: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  edit: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  image: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  video: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  upload: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  spinner: () => (
    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M6 12H2" />
    </svg>
  ),
  check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  close: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
};

const AdminRecuerdos = () => {
  const BACKEND_URL = 'http://localhost:3001';
  const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || 'taller-paradise-admin-2024';
  
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [recuerdos, setRecuerdos] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    tipo: 'taller',
    destacado: false
  });
  const [fotoPortada, setFotoPortada] = useState(null);
  const [archivosGaleria, setArchivosGaleria] = useState([]);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState('');
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [recuerdoEditando, setRecuerdoEditando] = useState(null);
  const [vista, setVista] = useState('lista');

  // ✅ VERIFICACIÓN CORREGIDA: Más estricta y sin conflictos
  useEffect(() => {
    const verificarAutenticacion = () => {
      // SOLO usar localStorage para persistencia
      const tokenLocalStorage = localStorage.getItem('admin_token');
      const loginTime = localStorage.getItem('admin_login_time');
      
      // Token de URL solo para acceso inicial (una vez)
      const tokenURL = searchParams.get('token');

      console.log('🔍 Verificando autenticación:', {
        tokenLocalStorage: tokenLocalStorage ? 'Presente' : 'No presente',
        tokenURL: tokenURL ? 'Presente' : 'No presente',
        loginTime: loginTime ? 'Guardado' : 'No guardado'
      });

      let tokenValido = false;
      let fuenteToken = '';

      // ✅ CORREGIDO: Verificación más estricta
      if (tokenLocalStorage && tokenLocalStorage === ADMIN_TOKEN) {
        tokenValido = true;
        fuenteToken = 'localStorage';
      } else if (tokenURL && tokenURL === ADMIN_TOKEN) {
        tokenValido = true;
        fuenteToken = 'URL';
        
        // Guardar token de URL en localStorage SOLO si es válido
        localStorage.setItem('admin_token', ADMIN_TOKEN);
        localStorage.setItem('admin_login_time', new Date().getTime().toString());
        
        // Limpiar token de la URL por seguridad
        navigate('/admin/recuerdos', { replace: true });
      }

      if (tokenValido) {
        console.log(`✅ Token válido encontrado en: ${fuenteToken}`);
        
        // Verificar expiración de sesión
        const sesionExpirada = verificarSesionExpirada();
        
        if (!sesionExpirada) {
          setAutenticado(true);
          setMostrarLogin(false);
          console.log('🎉 Sesión autenticada correctamente');
        } else {
          console.log('⏰ Sesión expirada, mostrando login');
          setMostrarLogin(true);
          setAutenticado(false);
          // Limpiar datos de sesión expirada
          localStorage.removeItem('admin_token');
          localStorage.removeItem('admin_login_time');
        }
      } else {
        console.log('🔒 No se encontró token válido, mostrando login');
        setMostrarLogin(true);
        setAutenticado(false);
        // Asegurarse de limpiar cualquier dato residual
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_login_time');
      }
    };

    verificarAutenticacion();
  }, [ADMIN_TOKEN, navigate, searchParams]);

  // ✅ CORREGIDO: Verificar expiración de sesión
  const verificarSesionExpirada = () => {
    const loginTime = localStorage.getItem('admin_login_time');
    if (!loginTime) {
      console.log('⏰ No hay tiempo de login registrado');
      return true; // Considerar como expirado
    }

    const currentTime = new Date().getTime();
    const sessionDuration = 3 * 60 * 60 * 1000; // 3 horas
    
    const tiempoTranscurrido = currentTime - parseInt(loginTime);
    const expirado = tiempoTranscurrido > sessionDuration;
    
    if (expirado) {
      console.log('🕒 Sesión expirada:', {
        tiempoTranscurrido: Math.round(tiempoTranscurrido / 1000 / 60) + ' minutos',
        limite: '3 horas'
      });
    }
    
    return expirado;
  };

  // ✅ CORREGIDO: Verificar autenticación antes de cada acción
  const verificarYRenovarSesion = () => {
    const sesionExpirada = verificarSesionExpirada();
    
    if (sesionExpirada) {
      console.log('🚫 Sesión expirada en verificación');
      setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      setMostrarLogin(true);
      setAutenticado(false);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_login_time');
      return false;
    }
    
    // Renovar tiempo de sesión en cada acción importante
    localStorage.setItem('admin_login_time', new Date().getTime().toString());
    return true;
  };

  // Cargar recuerdos al autenticar
  useEffect(() => {
    if (autenticado) {
      if (verificarYRenovarSesion()) {
        cargarRecuerdos();
      }
    }
  }, [autenticado]);

  // Función para cargar recuerdos
  const cargarRecuerdos = async () => {
    try {
      if (!verificarYRenovarSesion()) return;
      
      const response = await fetch(`${BACKEND_URL}/api/recuerdos`);
      const result = await response.json();
      
      if (result.success) {
        setRecuerdos(result.recuerdos);
      }
    } catch (error) {
      console.error('Error cargando recuerdos:', error);
      setError('Error al cargar los recuerdos');
    }
  };

  // ✅ CORREGIDO: Función de login mejorada
  const manejarLogin = (e) => {
    e.preventDefault();
    
    if (password === ADMIN_TOKEN) {
      // ✅ CORREGIDO: Limpiar cualquier dato anterior y establecer nueva sesión
      localStorage.setItem('admin_token', ADMIN_TOKEN);
      localStorage.setItem('admin_login_time', new Date().getTime().toString());
      
      setAutenticado(true);
      setMostrarLogin(false);
      setError('');
      setSuccess('¡Sesión iniciada correctamente!');
      
      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
      
      console.log('🔑 Sesión iniciada exitosamente - Token guardado en localStorage');
    } else {
      setError('Contraseña incorrecta');
      // Limpiar datos en caso de error
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_login_time');
    }
  };

  // ✅ CORREGIDO: Función para cerrar sesión COMPLETAMENTE
  const cerrarSesion = () => {
    console.log('🚪 Cerrando sesión...');
    
    // ✅ CORREGIDO: Limpiar TODOS los datos de sesión
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_login_time');
    
    // Resetear TODO el estado
    setAutenticado(false);
    setMostrarLogin(true);
    setPassword('');
    setRecuerdos([]);
    setError('');
    setSuccess('');
    setVista('lista');
    
    // ✅ IMPORTANTE: Redirigir al home y forzar recarga para limpiar estado
    navigate('/');
    
    console.log('✅ Sesión cerrada completamente - Redirigiendo al home');
  };

  // Resto de las funciones se mantienen igual...
  const subirACloudinary = async (archivo) => {
    if (!verificarYRenovarSesion()) {
      throw new Error('Sesión expirada');
    }

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (!tiposPermitidos.includes(archivo.type)) {
      throw new Error(`Tipo de archivo no permitido: ${archivo.type}. Formatos permitidos: JPG, PNG, GIF, WEBP, MP4.`);
    }

    const maxSize = 50 * 1024 * 1024; // 50MB
    if (archivo.size > maxSize) {
      throw new Error(`El archivo es demasiado grande: ${(archivo.size / 1024 / 1024).toFixed(2)}MB (Máximo: 50MB)`);
    }

    try {
      const base64 = await convertirArchivoABase64(archivo);
      const resourceType = archivo.type.startsWith('video/') ? 'video' : 'image';

      console.log('📤 Enviando archivo a backend:', {
        nombre: archivo.name,
        tipo: archivo.type,
        tamaño: (archivo.size / 1024 / 1024).toFixed(2) + 'MB',
        resourceType: resourceType
      });

      const response = await fetch(`${BACKEND_URL}/api/upload-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': ADMIN_TOKEN
        },
        body: JSON.stringify({
          image: base64,
          resourceType: resourceType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Archivo subido correctamente:', result.imageUrl);
        return {
          url: result.imageUrl,
          tipo: resourceType === 'video' ? 'video' : 'imagen'
        };
      } else {
        throw new Error(result.message || 'Error al subir archivo');
      }
    } catch (error) {
      console.error('❌ Error subiendo archivo:', error);
      throw error;
    }
  };

  const convertirArchivoABase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const manejarSeleccionPortada = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFotoPortada(archivo);
    }
  };

  const manejarSeleccionGaleria = (e) => {
    const archivos = Array.from(e.target.files);
    setArchivosGaleria(archivos);
  };

  const crearRecuerdo = async (recuerdoData) => {
    if (!verificarYRenovarSesion()) {
      throw new Error('Sesión expirada');
    }
    
    const response = await fetch(`${BACKEND_URL}/api/recuerdos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': ADMIN_TOKEN
      },
      body: JSON.stringify(recuerdoData)
    });
    return await response.json();
  };

  const actualizarRecuerdo = async (id, recuerdoData) => {
    if (!verificarYRenovarSesion()) {
      throw new Error('Sesión expirada');
    }
    
    const response = await fetch(`${BACKEND_URL}/api/recuerdos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': ADMIN_TOKEN
      },
      body: JSON.stringify(recuerdoData)
    });
    return await response.json();
  };

  const eliminarRecuerdo = async (id) => {
    if (!verificarYRenovarSesion()) {
      setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      return;
    }

    if (!id || id === 'undefined') {
      setError('ID de recuerdo inválido');
      return;
    }

    if (!confirm('¿Estás seguro de que quieres eliminar este recuerdo?')) {
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/recuerdos/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': ADMIN_TOKEN
        }
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccess('Recuerdo eliminado correctamente');
        cargarRecuerdos();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error eliminando recuerdo:', error);
      setError('Error al eliminar el recuerdo: ' + error.message);
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    
    if (!verificarYRenovarSesion()) {
      setError('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
      return;
    }
    
    setSubiendo(true);
    setError('');
    setSuccess('');

    try {
      let urlFotoPortada = modoEdicion ? recuerdoEditando.fotoPortada : null;
      if (fotoPortada) {
        const resultado = await subirACloudinary(fotoPortada);
        urlFotoPortada = resultado.url;
      }

      if (!urlFotoPortada && !modoEdicion) {
        throw new Error('La foto de portada es requerida');
      }

      const galeriaSubida = [];
      let erroresSubida = [];

      for (const [index, archivo] of archivosGaleria.entries()) {
        try {
          const resultado = await subirACloudinary(archivo);
          galeriaSubida.push({
            url: resultado.url,
            tipo: resultado.tipo,
            descripcion: ''
          });
        } catch (error) {
          erroresSubida.push(`Error con "${archivo.name}": ${error.message}`);
        }
      }

      if (erroresSubida.length > 0) {
        console.warn('Algunos archivos no se pudieron subir:', erroresSubida);
      }

      const recuerdoData = {
        ...formData,
        fotoPortada: urlFotoPortada,
        galeria: modoEdicion 
          ? [...(recuerdoEditando?.galeria || []), ...galeriaSubida]
          : galeriaSubida
      };

      let result;
      if (modoEdicion) {
        result = await actualizarRecuerdo(recuerdoEditando._id, recuerdoData);
      } else {
        result = await crearRecuerdo(recuerdoData);
      }

      if (result.success) {
        setSuccess(modoEdicion ? '¡Recuerdo actualizado exitosamente!' : '¡Recuerdo publicado exitosamente!');
        resetFormulario();
        cargarRecuerdos();
        setVista('lista');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      setError(error.message || 'Error al procesar el recuerdo. Por favor intenta nuevamente.');
    } finally {
      setSubiendo(false);
    }
  };

  const resetFormulario = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      fecha: '',
      tipo: 'taller',
      destacado: false
    });
    setFotoPortada(null);
    setArchivosGaleria([]);
    setModoEdicion(false);
    setRecuerdoEditando(null);
    
    const inputs = document.querySelectorAll('input[type="file"]');
    inputs.forEach(input => input.value = '');
  };

  const editarRecuerdo = (recuerdo) => {
    console.log('Editando recuerdo:', recuerdo);
    setFormData({
      titulo: recuerdo.titulo,
      descripcion: recuerdo.descripcion,
      fecha: recuerdo.fecha.split('T')[0],
      tipo: recuerdo.tipo,
      destacado: recuerdo.destacado
    });
    setModoEdicion(true);
    setRecuerdoEditando(recuerdo);
    setVista('formulario');
    setFotoPortada(null);
    setArchivosGaleria([]);
  };

  const nuevoRecuerdo = () => {
    resetFormulario();
    setVista('formulario');
  };

  // Componente de Login
  if (mostrarLogin) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/30"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Acceso Administrativo
            </h1>
            <p className="text-gray-600">Ingresa tu contraseña para continuar</p>
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-2xl flex items-center gap-2"
              >
                <SvgIcons.check />
                {success}
              </motion.div>
            )}
          </div>

          <form onSubmit={manejarLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Ingresa la contraseña"
                required
                autoFocus
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl flex items-center gap-2"
              >
                <SvgIcons.close />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              <SvgIcons.check />
              Ingresar al Panel
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-2xl text-sm text-blue-700">
            <p className="font-medium">💡 Información de sesión:</p>
            <p>Tu sesión durará 3 horas. Al cerrar sesión, se eliminará completamente el acceso.</p>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Vista de Lista de Recuerdos
  if (vista === 'lista') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen py-12 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center lg:text-left flex-1"
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Gestión de Recuerdos
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl">
                Administra y organiza los momentos especiales del taller
              </p>
            </motion.div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={nuevoRecuerdo}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl"
              >
                <SvgIcons.plus />
                Nuevo Recuerdo
              </button>
              <button
                onClick={cerrarSesion}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl"
              >
                <SvgIcons.logout />
                Cerrar Sesión
              </button>
            </div>
          </div>

          {/* Alertas */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3"
            >
              <SvgIcons.close />
              <span className="font-medium">{error}</span>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto mb-8 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3"
            >
              <SvgIcons.check />
              <span className="font-medium">{success}</span>
            </motion.div>
          )}

          {/* Lista de Recuerdos */}
          <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <SvgIcons.camera />
              Recuerdos Existentes
            </h2>
            
            {recuerdos.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 text-gray-400">
                  <SvgIcons.camera />
                </div>
                <p className="text-2xl text-gray-600 mb-4 font-medium">No hay recuerdos aún</p>
                <p className="text-gray-500 text-lg">Crea el primer recuerdo para comenzar</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recuerdos.map((recuerdo) => (
                  <motion.div
                    key={recuerdo._id || recuerdo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="mb-4">
                      {recuerdo.fotoPortada ? (
                        <img
                          src={recuerdo.fotoPortada}
                          alt={recuerdo.titulo}
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <SvgIcons.image className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{recuerdo.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{recuerdo.descripcion}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize font-medium">
                          {recuerdo.tipo}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {new Date(recuerdo.fecha).toLocaleDateString('es-ES')}
                        </span>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => editarRecuerdo(recuerdo)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <SvgIcons.edit />
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarRecuerdo(recuerdo._id || recuerdo.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <SvgIcons.trash />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Vista de Formulario
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-12 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center lg:text-left flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              {modoEdicion ? 'Editar Recuerdo' : 'Crear Nuevo Recuerdo'}
            </h1>
            <p className="text-xl text-gray-700">
              {modoEdicion ? 'Modifica los datos del recuerdo existente' : 'Completa los datos para crear un nuevo recuerdo'}
            </p>
          </motion.div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setVista('lista')}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl"
            >
              <SvgIcons.arrowLeft />
              Volver al Listado
            </button>
            <button
              onClick={cerrarSesion}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-2xl"
            >
              <SvgIcons.logout />
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Alertas */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3"
          >
            <SvgIcons.close />
            <span className="font-medium">{error}</span>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-8 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl flex items-center gap-3"
          >
            <SvgIcons.check />
            <span className="font-medium">{success}</span>
          </motion.div>
        )}

        {/* Formulario */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30">
          <form onSubmit={manejarSubmit} className="space-y-8">
            
            {/* Título */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Título del Recuerdo *
              </label>
              <input
                type="text"
                value={formData.titulo}
                onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg"
                placeholder="Ej: Taller de Acuarelas Primaverales"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Descripción *
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg h-32"
                placeholder="Describe el recuerdo, taller o evento..."
                required
              />
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Fecha del Evento *
              </label>
              <input
                type="date"
                value={formData.fecha}
                onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg"
                required
              />
            </div>

            {/* Tipo de Evento */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Tipo de Evento *
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 text-lg"
              >
                <option value="taller">Taller</option>
                <option value="evento">Evento Especial</option>
                <option value="festividad">Festividad</option>
                <option value="exposicion">Exposición</option>
                <option value="aniversario">Clase</option>
              </select>
            </div>

            {/* Destacado */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="destacado"
                checked={formData.destacado}
                onChange={(e) => setFormData({...formData, destacado: e.target.checked})}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="destacado" className="ml-2 text-lg font-semibold text-gray-800">
                Marcar como destacado
              </label>
            </div>

            {/* Foto de Portada */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Foto de Portada *
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-white/50 hover:bg-gray-100 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <SvgIcons.upload />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 50MB</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={manejarSeleccionPortada}
                  />
                </label>
              </div>
              {fotoPortada && (
                <div className="mt-4">
                  <p className="text-green-600">Archivo seleccionado: {fotoPortada.name}</p>
                </div>
              )}
            </div>

            {/* Galería de Fotos/Videos */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Galería de Fotos/Videos (Opcional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-white/50 hover:bg-gray-100 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <SvgIcons.upload />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4 hasta 50MB</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple
                    accept="image/*,video/*"
                    onChange={manejarSeleccionGaleria}
                  />
                </label>
              </div>
              {archivosGaleria.length > 0 && (
                <div className="mt-4">
                  <p className="text-green-600">Archivos seleccionados: {archivosGaleria.length}</p>
                  <ul className="list-disc list-inside">
                    {archivosGaleria.map((archivo, index) => (
                      <li key={index}>{archivo.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={subiendo}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl flex items-center justify-center gap-3"
              >
                {subiendo ? (
                  <>
                    <SvgIcons.spinner />
                    {modoEdicion ? 'Actualizando...' : 'Publicando...'}
                  </>
                ) : (
                  <>
                    <SvgIcons.check />
                    {modoEdicion ? 'Actualizar Recuerdo' : 'Publicar Recuerdo'}
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => setVista('lista')}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-8 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <SvgIcons.close />
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminRecuerdos;