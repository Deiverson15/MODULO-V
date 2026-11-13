import {Router} from "express";
import {crearTarea, obtenerTareasInCompletas, 
    obtenerTareasCompletas, 
    obtenerTareasPorCategoria,
    actualizarTarea, completarTarea,
    eliminarTarea
} from '../controllers/tarea.controller.js'
const router = Router();


router.get('/incompletas', obtenerTareasInCompletas);
router.get('/completas', obtenerTareasCompletas);
router.get('/categorias/:categoria', obtenerTareasPorCategoria);


router.post('/',crearTarea);
router.put('/:id', actualizarTarea);
router.put('/:id/completar', completarTarea);
router.delete('/:id', eliminarTarea)

export default router


