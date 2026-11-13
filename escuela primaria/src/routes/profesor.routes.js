import { Router } from 'express';
import {
  crearProfesor,
  obtenerProfesores,
  obtenerProfesorPorId,
  obtenerProfesoresPorGrado,
  obtenerProfesoresDobleTurno
} from '../controllers/profesor.controller.js';

const router = Router();


router.get('/doble-turno', obtenerProfesoresDobleTurno);
router.get('/grado/:grado', obtenerProfesoresPorGrado);


router.post('/', crearProfesor);
router.get('/', obtenerProfesores);
router.get('/:id', obtenerProfesorPorId);

export default router;