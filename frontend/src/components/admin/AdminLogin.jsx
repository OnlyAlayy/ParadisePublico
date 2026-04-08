import React from 'react';
import { motion } from 'framer-motion';
import { SvgIcons } from './AdminIcons';

const AdminLogin = ({ password, setPassword, manejarLogin, error, success }) => {
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
};

export default AdminLogin;
