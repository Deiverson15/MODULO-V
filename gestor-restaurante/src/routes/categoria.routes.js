import { Router } from 'express';
import {
  crearCategoria,
  obtenerCategorias,
  eliminarCategoria
} from '../controllers/categoria.controller.js';

const categoriaRouter = Router();

categoriaRouter.get('/', obtenerCategorias);
categoriaRouter.post('/', crearCategoria);
categoriaRouter.delete('/:id', eliminarCategoria);

export default categoriaRouter;