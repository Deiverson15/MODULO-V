import { Router } from 'express';
import {
  obtenerPedidos,
  obtenerPedidoPorId,
  crearPedido,
  actualizarEstadoPedido,
  eliminarPedido
} from '../controllers/pedido.controller.js';

const pedidoRouter = Router();


pedidoRouter.put('/estado/:id', actualizarEstadoPedido);

pedidoRouter.get('/', obtenerPedidos);
pedidoRouter.get('/:id', obtenerPedidoPorId);
pedidoRouter.post('/', crearPedido);
pedidoRouter.delete('/:id', eliminarPedido);

export default pedidoRouter;