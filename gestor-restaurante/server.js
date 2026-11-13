import express from 'express';
import 'dotenv/config';
import conectarDB from './src/config/db.js';
import categoriaRoutes from './src/routes/categoria.routes.js';
import menuRoutes from './src/routes/menu.routes.js';
import pedidoRoutes from './src/routes/pedido.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_PATH = process.env.BASE_API_PATH || '/api';

conectarDB();

app.use(express.json());

app.use(`${BASE_PATH}/categorias`, categoriaRoutes);
app.use(`${BASE_PATH}/menu`, menuRoutes);
app.use(`${BASE_PATH}/pedidos`, pedidoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor del restaurante activo en http://localhost:${PORT}${BASE_PATH}`);
});