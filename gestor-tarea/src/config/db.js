import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://baezjavier884_db_user:X0omtujl8l79KCzm@deiverson.umb3nfg.mongodb.net/GestionTareas?retryWrites=true&w=majority';

function db() {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Conexión a la base de datos establecida'))
    .catch((error) => console.error('Error al conectar a la base de datos:', error));
}

export default db;