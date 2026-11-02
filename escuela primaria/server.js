import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const MONGO_URI = 'mongodb+srv://baezjavier884_db_user:X0omtujl8l79KCzm@deiverson.umb3nfg.mongodb.net/escuela?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado exitosamente a MongoDB'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

const alumnoSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  edad: { type: Number, required: true },
  grado: { type: String, required: true }
});

const Alumno = mongoose.model('Alumno', alumnoSchema);

const profesorSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true },
  edad: { type: Number, required: true },
  grado: { type: String, required: true },
  honorarios: { type: Number, required: true },
  dobleTurno: { type: Boolean, required: true }
});

const Profesor = mongoose.model('Profesor', profesorSchema);


app.post('/alumnos', async (req, res) => {
  try {
    const { id, nombre, apellido, cedula, edad, grado } = req.body;

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
    res.status(400).json({
      mensaje: 'No se pudo crear el alumno',
      error: error.message
    });
  }
});


app.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await Alumno.find();

    res.status(200).json({
      mensaje: 'Alumnos obtenidos con éxito',
      total: alumnos.length,
      alumnos: alumnos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los alumnos',
      error: error.message
    });
  }
});


app.get('/alumnos/grado/:grado', async (req, res) => {
  try {
    const { grado } = req.params;
    const alumnos = await Alumno.find({ grado: grado });

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
});


app.get('/alumnos/:id', async (req, res) => {
  try {
    const idCapturado = parseInt(req.params.id);
    const alumnoEncontrado = await Alumno.findOne({ id: idCapturado });

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
      mensaje: 'Error de servidor',
      error: error.message
    });
  }
});


app.post('/profesores', async (req, res) => {
  try {
    const { id, nombre, apellido, cedula, edad, grado, honorarios, dobleTurno } = req.body;

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
    res.status(400).json({
      mensaje: 'No se pudo crear el profesor',
      error: error.message
    });
  }
});

app.get('/profesores', async (req, res) => {
  try {
    const profesores = await Profesor.find();

    res.status(200).json({
      mensaje: 'Profesores obtenidos con éxito',
      total: profesores.length,
      profesores: profesores
    });
  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los profesores',
      error: error.message
    });
  }
});


app.get('/profesores/filtro/doble-turno', async (req, res) => {
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
});


app.get('/profesores/grado/:grado', async (req, res) => {
  try {
    const { grado } = req.params;
    const profesores = await Profesor.find({ grado: grado });

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
});

app.get('/profesores/:id', async (req, res) => {
  try {
    const idCapturado = parseInt(req.params.id);
    const profesorEncontrado = await Profesor.findOne({ id: idCapturado });

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
      mensaje: 'Error de servidor',
      error: error.message
    });
  }
});


app.put('/alumnos/:id', async (req, res) => {
  try {
    const idCapturado = parseInt(req.params.id);

    const alumnoActualizado = await Alumno.findOneAndUpdate(
      { id: idCapturado },
      req.body,
      { new: true, runValidators: true }
    );

    if (!alumnoActualizado) {
      return res.status(404).json({
        mensaje: 'No se encontró el alumno para actualizar'
      });
    }

    res.status(200).json({
      mensaje: 'Alumno actualizado con éxito',
      alumno: alumnoActualizado
    });
  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar el alumno',
      error: error.message
    });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor de la escuela activo en http://localhost:${PORT}`);
});