import dotenv from 'dotenv';
// Configuración de dotenv
dotenv.config();

// Configuración de las variables de entorno
export const PORT = process.env.PORT || 5001;
export const MONGO_URI = process.env.MONGO_URI;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES;