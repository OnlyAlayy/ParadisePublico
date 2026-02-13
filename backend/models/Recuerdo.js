// models/Recuerdo.js (ACTUALIZADO)
import mongoose from 'mongoose';

const recuerdoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  tipo: {
    type: String,
    enum: ['taller', 'exposicion', 'evento', 'clase'],
    default: 'taller'
  },
  fotoPortada: {
    type: String, // URL de la foto principal
    required: true
  },
  galeria: [{
    url: String,
    tipo: {
      type: String,
      enum: ['imagen', 'video'],
      default: 'imagen'
    },
    descripcion: String
  }],
  destacado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Recuerdo', recuerdoSchema);