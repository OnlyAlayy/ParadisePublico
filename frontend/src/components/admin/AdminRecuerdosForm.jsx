import React from 'react';
import { motion } from 'framer-motion';
import { SvgIcons } from './AdminIcons';

const AdminRecuerdosForm = ({
  formData,
  setFormData,
  modoEdicion,
  recuerdoEditando,
  setVista,
  cerrarSesion,
  error,
  success,
  manejarSubmit,
  manejarSeleccionPortada,
  fotoPortada,
  manejarSeleccionGaleria,
  archivosGaleria,
  subiendo
}) => {
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
                Foto de Portada {modoEdicion ? '(Opcional, sobrescribe la actual)' : '*'}
              </label>

              {modoEdicion && !!recuerdoEditando?.fotoPortada && !fotoPortada && (
                <div className="mb-4 relative w-32 h-32">
                  <img src={recuerdoEditando.fotoPortada} alt="Portada actual" className="w-full h-full object-cover rounded-xl shadow-md border-2 border-blue-200" />
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow">Actual</span>
                </div>
              )}

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

              {modoEdicion && recuerdoEditando?.galeria?.length > 0 && (
                <div className="mb-4">
                  <p className="text-gray-600 mb-2 font-medium">Imágenes/videos actuales en la galería:</p>
                  <div className="flex flex-wrap gap-3">
                    {recuerdoEditando.galeria.map((media, idx) => (
                      <div key={idx} className="relative w-20 h-20">
                        {media.tipo === 'video' ? (
                          <video src={media.url} className="w-full h-full object-cover rounded-lg shadow border" muted />
                        ) : (
                          <img src={media.url} alt={`media ${idx}`} className="w-full h-full object-cover rounded-lg shadow border" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Nuevos archivos se sumarán a esta galería.</p>
                </div>
              )}

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

export default AdminRecuerdosForm;
