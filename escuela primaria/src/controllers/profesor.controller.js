import mongoose from 'mongoose';
import { Profesor } from '../models/Profesor.js';


export const crearProfesor = async (req, res) => {
  try {
    const { id, nombre, apellido, cedula, edad, grado, honorarios, dobleTurno } = req.body;

    if (!id || !nombre || !apellido || !cedula || !edad || !grado || honorarios === undefined || dobleTurno === undefined) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    const profesorExistente = await Profesor.findOne({ id });
    if (profesorExistente) {
      return res.status(400).json({
        mensaje: `Ya existe un profesor registrado con el id ${id}`
      });
    }

    const nuevoProfesor = await Profesor.create({
      id,
      nombre,
      apellido,
      cedula,
      edad,
      grado,
      honorarios,
      dobleTurno
    });

    res.status(201).json({
      mensaje: 'Profesor creado con éxito',
      profesor: nuevoProfesor
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar el profesor',
      error: error.message
    });
  }
};


export const obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.find();

    res.status(200).json({
      mensaje: 'Profesores obtenidos con éxito',
      total: profesores.length,
      profesores
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los profesores',
      error: error.message
    });
  }
};


export const obtenerProfesorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    let profesorEncontrado;

    if (mongoose.Types.ObjectId.isValid(id)) {
      profesorEncontrado = await Profesor.findById(id);
    } else if (!isNaN(Number(id))) {
      profesorEncontrado = await Profesor.findOne({ id: Number(id) });
    } else {
      return res.status(400).json({
        mensaje: 'El formato del ID proporcionado no es válido'
      });
    }

    if (!profesorEncontrado) {
      return res.status(404).json({
        mensaje: 'Profesor no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Profesor encontrado con éxito',
      profesor: profesorEncontrado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al buscar el profesor',
      error: error.message
    });
  }
};


export const obtenerProfesoresPorGrado = async (req, res) => {
  try {
    const { grado } = req.params;
    const profesores = await Profesor.find({ grado });

    if (profesores.length === 0) {
      return res.status(404).json({
        mensaje: `No se encontraron profesores asignados al grado ${grado}`,
        total: 0
      });
    }

    res.status(200).json({
      mensaje: `Profesores asignados al grado ${grado}`,
      total: profesores.length,
      profesores
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al consultar los profesores por grado',
      error: error.message
    });
  }
};

export const obtenerProfesoresDobleTurno = async (req, res) => {
  try {
    const profesoresDobleTurno = await Profesor.find({ dobleTurno: true });

    res.status(200).json({
      mensaje: 'Profesores con doble turno obtenidos con éxito',
      total: profesoresDobleTurno.length,
      profesores: profesoresDobleTurno
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al consultar profesores con doble turno',
      error: error.message
    });
  }
};