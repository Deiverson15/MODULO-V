import mongoose from 'mongoose';
import 'dotenv/config';

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado exitosamente a MongoDB - Restaurante');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

export default conectarDB;