import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  completado: {
    type: Boolean,
    default: false,
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  fecha_fin: Date,
  fecha_eliminacion: Date,
});


export const Tarea = mongoose.model('Tarea', tareaSchema)

