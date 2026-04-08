import mongoose from 'mongoose';
import Recuerdo from '../models/Recuerdo.js';

export const obtenerRecuerdos = async (req, res) => {
  try {
    const { pagina = 1, limite = 12, tipo, destacado } = req.query;
    
    const filtro = {};
    if (tipo && tipo !== 'todos') filtro.tipo = tipo;
    if (destacado === 'true') filtro.destacado = true;
    
    const recuerdos = await Recuerdo.find(filtro)
      .sort({ fecha: -1 })
      .limit(limite * 1)
      .skip((pagina - 1) * limite);
    
    const total = await Recuerdo.countDocuments(filtro);
    
    res.json({ 
      success: true, 
      recuerdos,
      paginacion: {
        pagina: parseInt(pagina),
        totalPaginas: Math.ceil(total / limite),
        totalRecuerdos: total,
        tieneSiguiente: pagina < Math.ceil(total / limite),
        tieneAnterior: pagina > 1
      }
    });
  } catch (error) {
    console.error('Error obteniendo recuerdos:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

export const obtenerRecuerdo = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || id === 'undefined' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de recuerdo inválido' 
      });
    }

    const recuerdo = await Recuerdo.findById(id);
    
    if (!recuerdo) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recuerdo no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      recuerdo 
    });
  } catch (error) {
    console.error('Error obteniendo recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor' 
    });
  }
};

export const crearRecuerdo = async (req, res) => {
  try {
    // Los datos ya están validados y sanitizados por Zod
    const { titulo, descripcion, fecha, tipo, fotoPortada, galeria, destacado } = req.body;

    const nuevoRecuerdo = new Recuerdo({
      titulo,
      descripcion,
      fecha: new Date(fecha),
      tipo: tipo || 'taller',
      fotoPortada,
      galeria: galeria.map(item => ({
        url: item.url,
        tipo: item.tipo || 'imagen',
        descripcion: item.descripcion || ''
      })),
      destacado: Boolean(destacado)
    });

    const recuerdoGuardado = await nuevoRecuerdo.save();

    res.status(201).json({ 
      success: true, 
      message: 'Recuerdo creado correctamente',
      recuerdo: recuerdoGuardado 
    });

  } catch (error) {
    console.error('❌ Error creando recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al crear el recuerdo' 
    });
  }
};

export const actualizarRecuerdo = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, tipo, fotoPortada, galeria, destacado } = req.body;

    const recuerdoActualizado = await Recuerdo.findByIdAndUpdate(
      req.params.id,
      {
        titulo,
        descripcion,
        fecha: fecha ? new Date(fecha) : undefined,
        tipo,
        fotoPortada,
        galeria: galeria ? galeria.map(item => ({
          url: item.url,
          tipo: item.tipo || 'imagen',
          descripcion: item.descripcion || ''
        })) : undefined,
        destacado
      },
      { new: true, runValidators: true }
    );

    if (!recuerdoActualizado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recuerdo no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Recuerdo actualizado correctamente',
      recuerdo: recuerdoActualizado
    });

  } catch (error) {
    console.error('Error actualizando recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al actualizar el recuerdo' 
    });
  }
};

export const eliminarRecuerdo = async (req, res) => {
  try {
    const recuerdoEliminado = await Recuerdo.findByIdAndDelete(req.params.id);
    
    if (!recuerdoEliminado) {
      return res.status(404).json({ 
        success: false, 
        message: 'Recuerdo no encontrado' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Recuerdo eliminado correctamente',
      recuerdo: recuerdoEliminado
    });

  } catch (error) {
    console.error('Error eliminando recuerdo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error interno del servidor al eliminar el recuerdo' 
    });
  }
};
