import {Router} from "express";
import {crearCategoria} from '../controllers/categoria.controller.js'
const router = Router();

router.post('/', crearCategoria);

export default router