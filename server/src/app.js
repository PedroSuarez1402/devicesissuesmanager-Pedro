// Importación de módulos necesarios
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
/* configuracion del dotenv */
dotenv.config()
/* Rutas */
import routes from './routes/index.js'

/* Conexion a la base de datos */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error("Error al contectar a MongoDB: ", err));

const app = express();// Creación de una instancia de la aplicación Express

// Middlewares principales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

/* Configuracion de las rutas */
routes(app)

const port = process.env.PORT || 5001;
/* Inicio del servidor */
app.listen(port, () => {
  console.log(`Servidor escuchado en el puerto: ${port}`);
});
