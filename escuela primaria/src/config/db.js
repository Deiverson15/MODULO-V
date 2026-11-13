import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://baezjavier884_db_user:X0omtujl8l79KCzm@deiverson.umb3nfg.mongodb.net/escuela?retryWrites=true&w=majority';

const conectarDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado exitosamente a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
  }
};

export default conectarDB;