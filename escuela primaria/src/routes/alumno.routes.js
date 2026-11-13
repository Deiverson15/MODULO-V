import { Router } from 'express';
import {
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumnoPorId,
  obtenerAlumnosPorGrado,
  actualizarAlumno
} from '../controllers/alumno.controller.js';

const router = Router();


router.get('/grado/:grado', obtenerAlumnosPorGrado);


router.post('/', crearAlumno);
router.get('/', obtenerAlumnos);
router.get('/:id', obtenerAlumnoPorId);
router.put('/:id', actualizarAlumno);

export default router;