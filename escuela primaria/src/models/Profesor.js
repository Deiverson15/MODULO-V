import mongoose from 'mongoose';

const profesorSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  edad: { type: Number, required: true },
  grado: { type: String, required: true },
  honorarios: { type: Number, required: true },
  dobleTurno: { type: Boolean, required: true }
});

export const Profesor = mongoose.model('Profesor', profesorSchema);