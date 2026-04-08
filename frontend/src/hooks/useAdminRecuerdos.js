import { useState, useCallback } from 'react';
import { adminAuth } from '../utils/auth';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export const useAdminRecuerdos = (setError, setSuccess, cerrarSesion) => {
  const [recuerdos, setRecuerdos] = useState([]);
  const [subiendo, setSubiendo] = useState(false);

  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'x-auth-token': adminAuth.getToken()
    };
  };

  const cargarRecuerdos = useCallback(async () => {
    try {
      if (adminAuth.verificarSesionExpirada()) {
        cerrarSesion();
        return;
      }
      const response = await fetch(`${BACKEND_URL}/api/recuerdos`);
      const result = await response.json();
      if (result.success) setRecuerdos(result.recuerdos);
    } catch (error) {
      console.error('Error cargando recuerdos:', error);
      setError('Error al cargar los recuerdos');
    }
  }, [cerrarSesion, setError]);

  const subirACloudinary = async (archivo) => {
    if (adminAuth.verificarSesionExpirada()) throw new Error('Sesión expirada');
    
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime'];
    if (!tiposPermitidos.includes(archivo.type)) {
      throw new Error(`Tipo no permitido: ${archivo.type}`);
    }

    if (archivo.size > 50 * 1024 * 1024) throw new Error('El archivo supera 50MB');

    try {
      const base64 = await convertirArchivoABase64(archivo);
      const resourceType = archivo.type.startsWith('video/') ? 'video' : 'image';

      const response = await fetch(`${BACKEND_URL}/api/upload-image`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ image: base64, resourceType })
      });

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const result = await response.json();
      if (result.success) return { url: result.imageUrl, tipo: resourceType === 'video' ? 'video' : 'imagen' };
      throw new Error(result.message || 'Error al subir');
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const convertirArchivoABase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const crearRecuerdo = async (recuerdoData) => {
    if (adminAuth.verificarSesionExpirada()) throw new Error('Sesión expirada');
    const response = await fetch(`${BACKEND_URL}/api/recuerdos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(recuerdoData)
    });
    return await response.json();
  };

  const actualizarRecuerdo = async (id, recuerdoData) => {
    if (adminAuth.verificarSesionExpirada()) throw new Error('Sesión expirada');
    const response = await fetch(`${BACKEND_URL}/api/recuerdos/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(recuerdoData)
    });
    return await response.json();
  };

  const eliminarRecuerdo = async (id) => {
    if (adminAuth.verificarSesionExpirada()) {
      cerrarSesion();
      return;
    }
    if (!id || id === 'undefined') return setError('ID inválido');
    if (!confirm('¿Estás seguro de que quieres eliminar este recuerdo?')) return;

    try {
      const response = await fetch(`${BACKEND_URL}/api/recuerdos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setSuccess('Recuerdo eliminado');
        cargarRecuerdos();
      } else throw new Error(result.message);
    } catch (error) {
      setError('Error al eliminar: ' + error.message);
    }
  };

  return {
    recuerdos,
    subiendo,
    setSubiendo,
    cargarRecuerdos,
    subirACloudinary,
    crearRecuerdo,
    actualizarRecuerdo,
    eliminarRecuerdo
  };
};
