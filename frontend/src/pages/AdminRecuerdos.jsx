import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuth } from '../utils/auth';
import { useAdminRecuerdos } from '../hooks/useAdminRecuerdos';
import AdminLogin from '../components/admin/AdminLogin';
import AdminRecuerdosList from '../components/admin/AdminRecuerdosList';
import AdminRecuerdosForm from '../components/admin/AdminRecuerdosForm';

const AdminRecuerdos = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha: '',
    tipo: 'taller',
    destacado: false
  });
  const [fotoPortada, setFotoPortada] = useState(null);
  const [archivosGaleria, setArchivosGaleria] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [autenticado, setAutenticado] = useState(adminAuth.isAuthenticated());
  const [password, setPassword] = useState('');
  const [mostrarLogin, setMostrarLogin] = useState(!adminAuth.isAuthenticated());
  const [modoEdicion, setModoEdicion] = useState(false);
  const [recuerdoEditando, setRecuerdoEditando] = useState(null);
  const [vista, setVista] = useState('lista');

  const {
    recuerdos,
    subiendo,
    setSubiendo,
    cargarRecuerdos,
    subirACloudinary,
    crearRecuerdo,
    actualizarRecuerdo,
    eliminarRecuerdo
  } = useAdminRecuerdos(setError, setSuccess, () => cerrarSesion());

  useEffect(() => {
    if (autenticado) {
      if (adminAuth.verificarSesionExpirada()) {
        cerrarSesion();
      } else {
        cargarRecuerdos();
      }
    } else {
        setMostrarLogin(true);
    }
  }, [autenticado, cargarRecuerdos]);

  const manejarLogin = async (e) => {
    e.preventDefault();
    const result = await adminAuth.login(password);
    if (result.success) {
      setAutenticado(true);
      setMostrarLogin(false);
      setError('');
      setSuccess('¡Sesión iniciada correctamente!');
      setTimeout(() => setSuccess(''), 3000);
      cargarRecuerdos();
    } else {
      setError(result.message);
    }
  };

  const cerrarSesion = () => {
    adminAuth.logout();
    setAutenticado(false);
    setMostrarLogin(true);
    setPassword('');
    setError('');
    setSuccess('');
    setVista('lista');
    navigate('/');
  };

  const manejarSeleccionPortada = (e) => {
    const archivo = e.target.files[0];
    if (archivo) setFotoPortada(archivo);
  };

  const manejarSeleccionGaleria = (e) => setArchivosGaleria(Array.from(e.target.files));

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (adminAuth.verificarSesionExpirada()) {
      cerrarSesion();
      return;
    }
    setSubiendo(true);
    setError('');
    setSuccess('');

    try {
      let urlFotoPortada = modoEdicion ? recuerdoEditando.fotoPortada : null;
      if (fotoPortada) urlFotoPortada = (await subirACloudinary(fotoPortada)).url;
      if (!urlFotoPortada && !modoEdicion) throw new Error('La foto de portada es requerida');

      const galeriaSubida = [];
      for (const archivo of archivosGaleria) {
        try {
          const resultado = await subirACloudinary(archivo);
          galeriaSubida.push({ url: resultado.url, tipo: resultado.tipo, descripcion: '' });
        } catch (err) {
          console.error(err);
        }
      }

      const recuerdoData = {
        ...formData,
        fotoPortada: urlFotoPortada,
        galeria: modoEdicion ? [...(recuerdoEditando?.galeria || []), ...galeriaSubida] : galeriaSubida
      };

      const result = modoEdicion 
        ? await actualizarRecuerdo(recuerdoEditando._id || recuerdoEditando.id, recuerdoData)
        : await crearRecuerdo(recuerdoData);

      if (result.success) {
        setSuccess(modoEdicion ? '¡Actualizado!' : '¡Publicado!');
        resetFormulario();
        cargarRecuerdos();
        setVista('lista');
      } else throw new Error(result.message);
    } catch (error) {
      setError(error.message || 'Error al procesar el recuerdo.');
    } finally {
      setSubiendo(false);
    }
  };

  const resetFormulario = () => {
    setFormData({ titulo: '', descripcion: '', fecha: '', tipo: 'taller', destacado: false });
    setFotoPortada(null);
    setArchivosGaleria([]);
    setModoEdicion(false);
    setRecuerdoEditando(null);
  };

  const editarRecuerdo = (recuerdo) => {
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

  if (mostrarLogin) {
    return (
      <AdminLogin
        password={password}
        setPassword={setPassword}
        manejarLogin={manejarLogin}
        error={error}
        success={success}
      />
    );
  }

  if (vista === 'lista') {
    return (
      <AdminRecuerdosList
        recuerdos={recuerdos}
        error={error}
        success={success}
        nuevoRecuerdo={nuevoRecuerdo}
        cerrarSesion={cerrarSesion}
        editarRecuerdo={editarRecuerdo}
        eliminarRecuerdo={eliminarRecuerdo}
      />
    );
  }

  return (
    <AdminRecuerdosForm
      formData={formData}
      setFormData={setFormData}
      modoEdicion={modoEdicion}
      recuerdoEditando={recuerdoEditando}
      setVista={setVista}
      cerrarSesion={cerrarSesion}
      error={error}
      success={success}
      manejarSubmit={manejarSubmit}
      manejarSeleccionPortada={manejarSeleccionPortada}
      fotoPortada={fotoPortada}
      manejarSeleccionGaleria={manejarSeleccionGaleria}
      archivosGaleria={archivosGaleria}
      subiendo={subiendo}
    />
  );
};

export default AdminRecuerdos;