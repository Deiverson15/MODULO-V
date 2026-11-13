import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    precio: {
      type: Number,
      required: true,
      min: 0
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categoria',
      required: true
    },
    disponible: {
      type: Boolean,
      default: true
    },
    fecha_eliminado: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;