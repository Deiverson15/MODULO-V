import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema(
  {
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
      }
    ],
    total: {
      type: Number,
      required: true,
      min: 0
    },
    observaciones: {
      type: String,
      trim: true,
      default: ''
    },
    estado: {
      type: String,
      enum: ['PENDIENTE', 'EN_PREPARACION', 'LISTO', 'ENTREGADO', 'CANCELADO'],
      default: 'PENDIENTE'
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

const Pedido = mongoose.model('Pedido', pedidoSchema);

export default Pedido;