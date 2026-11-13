import mongoose from 'mongoose';

const alumnoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  edad: { type: Number, required: true },
  grado: { type: String, required: true }
});

export const Alumno = mongoose.model('Alumno', alumnoSchema);