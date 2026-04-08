import React from 'react';
import { motion } from 'framer-motion';
import { SvgIcons } from './AdminIcons';

const AdminRecuerdosList = ({
  recuerdos,
  error,
  success,
  nuevoRecuerdo,
  cerrarSesion,
  editarRecuerdo,
  eliminarRecuerdo
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
};

export default AdminRecuerdosList;
