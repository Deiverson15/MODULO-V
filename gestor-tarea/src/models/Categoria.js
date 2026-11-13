import mongoose from 'mongoose';



const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

export const Categoria = mongoose.model('Categoria', categoriaSchema);