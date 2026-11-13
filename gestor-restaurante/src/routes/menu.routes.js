import { Router } from 'express';
import {
  obtenerMenu,
  obtenerMenuPorId,
  crearMenu,
  actualizarMenu,
  desactivarMenu,
  activarMenu,
  eliminarMenu
} from '../controllers/menu.controller.js';

const menuRouter = Router();

menuRouter.put('/no-disponible/:id', desactivarMenu);
menuRouter.put('/disponible/:id', activarMenu);

menuRouter.get('/', obtenerMenu);
menuRouter.get('/:id', obtenerMenuPorId);
menuRouter.post('/', crearMenu);
menuRouter.put('/:id', actualizarMenu);
menuRouter.delete('/:id', eliminarMenu);

export default menuRouter;