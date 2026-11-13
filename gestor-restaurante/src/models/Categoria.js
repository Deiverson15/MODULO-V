import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    fecha_eliminacion: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Categoria = mongoose.model('Categoria', categoriaSchema);

export default Categoria;