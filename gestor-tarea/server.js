import express from 'express';
import db from './src/config/db.js';
import tareaRoutes from './src/routes/tarea.routes.js'
import categoriaRoutes from './src/routes/categoria.routes.js'


const PORT = process.env.PORT || 3000;
const app = express();

// Conectar a la base de datos
db();

// Middleware para procesar JSON en el cuerpo de las peticiones
app.use(express.json());
app.use('/tareas', tareaRoutes)
app.use('/categorias',categoriaRoutes)





app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

