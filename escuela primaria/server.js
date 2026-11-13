import express from 'express';
import conectarDB from './src/config/db.js';
import alumnoRoutes from './src/routes/alumno.routes.js';
import profesorRoutes from './src/routes/profesor.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

conectarDB();

app.use(express.json());

app.use('/alumnos', alumnoRoutes);
app.use('/profesores', profesorRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de la escuela activo en http://localhost:${PORT}`);
});