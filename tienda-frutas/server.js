import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());


let frutas = [
  { id: 1, nombre: 'Manzana', color: 'Rojo' },
  { id: 2, nombre: 'Banana', color: 'Amarillo' }
];


app.get('/frutas', (req, res) => {
  res.status(200).json(frutas);
});


app.get('/frutas/:id', (req, res) => {
  const idCapturar = parseInt(req.params.id);
  const frutaEncontrada = frutas.find(fruta => fruta.id === idCapturar);

  if (!frutaEncontrada) {
    return res.status(404).json({ mensaje: 'Fruta no encontrada' });
  }

  res.status(200).json(frutaEncontrada);
});


app.post('/frutas', (req, res) => {
  const { nombre, color } = req.body;

  const nuevaFruta = {
    id: frutas.length + 1,
    nombre: nombre,
    color: color
  };

  frutas.push(nuevaFruta);

  res.status(201).json(nuevaFruta);
});


app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});