import mongoose from 'mongoose';
import { Alumno } from '../models/Alumno.js';


export const crearAlumno = async (req, res) => {
  try {
    const { id, nombre, apellido, cedula, edad, grado } = req.body;

    if (!id || !nombre || !apellido || !cedula || !edad || !grado) {
      return res.status(400).json({
        mensaje: 'Todos los campos son obligatorios'
      });
    }

    const alumnoExistente = await Alumno.findOne({ id });
    if (alumnoExistente) {
      return res.status(400).json({
        mensaje: `Ya existe un alumno registrado con el id ${id}`
      });
    }

    const nuevoAlumno = await Alumno.create({
      id,
      nombre,
      apellido,
      cedula,
      edad,
      grado
    });

    res.status(201).json({
      mensaje: 'Alumno creado con éxito',
      alumno: nuevoAlumno
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al registrar el alumno',
      error: error.message
    });
  }
};


export const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find();

    res.status(200).json({
      mensaje: 'Alumnos obtenidos con éxito',
      total: alumnos.length,
      alumnos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los alumnos',
      error: error.message
    });
  }
};


export const obtenerAlumnoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    let alumnoEncontrado;

    if (mongoose.Types.ObjectId.isValid(id)) {
      alumnoEncontrado = await Alumno.findById(id);
    } else if (!isNaN(Number(id))) {
      alumnoEncontrado = await Alumno.findOne({ id: Number(id) });
    } else {
      return res.status(400).json({
        mensaje: 'El formato del ID proporcionado no es válido'
      });
    }

    if (!alumnoEncontrado) {
      return res.status(404).json({
        mensaje: 'No se encontró el alumno'
      });
    }

    res.status(200).json({
      mensaje: 'Alumno encontrado con éxito',
      alumno: alumnoEncontrado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al buscar el alumno',
      error: error.message
    });
  }
};


export const obtenerAlumnosPorGrado = async (req, res) => {
  try {
    const { grado } = req.params;
    const alumnos = await Alumno.find({ grado });

    if (alumnos.length === 0) {
      return res.status(404).json({
        mensaje: `No se encontraron alumnos en el grado ${grado}`,
        total: 0
      });
    }

    res.status(200).json({
      mensaje: `Alumnos encontrados para el grado ${grado}`,
      total: alumnos.length,
      alumnos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al consultar los alumnos por grado',
      error: error.message
    });
  }
};

export const actualizarAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, cedula, edad, grado } = req.body;
    let alumno;

    if (mongoose.Types.ObjectId.isValid(id)) {
      alumno = await Alumno.findById(id);
    } else if (!isNaN(Number(id))) {
      alumno = await Alumno.findOne({ id: Number(id) });
    } else {
      return res.status(400).json({
        mensaje: 'El formato del ID proporcionado no es válido'
      });
    }

    if (!alumno) {
      return res.status(404).json({
        mensaje: 'No se encontró el alumno para actualizar'
      });
    }

    alumno.nombre = nombre || alumno.nombre;
    alumno.apellido = apellido || alumno.apellido;
    alumno.cedula = cedula || alumno.cedula;
    alumno.edad = edad || alumno.edad;
    alumno.grado = grado || alumno.grado;

    const alumnoActualizado = await alumno.save();

    res.status(200).json({
      mensaje: 'Alumno actualizado con éxito',
      alumno: alumnoActualizado
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al actualizar el alumno',
      error: error.message
    });
  }
};