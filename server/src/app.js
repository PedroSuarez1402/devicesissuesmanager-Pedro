// Importación de módulos necesarios
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import { PORT } from './config/index.js';
import routes from './routes/index.js'

const app = express();// Creación de una instancia de la aplicación Express

// Middlewares principales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// --- Inicialización del Servidor ---
// Función asíncrona para asegurar que la BD conecte antes de escuchar peticiones
const startServer = async () => {
    try {
        // 1. Conectar a Base de Datos
        await connectDB();

        // 2. Configurar Rutas (se cargan después de asegurar la BD, opcionalmente)
        routes(app);

        // 3. Levantar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto: ${PORT}`);
        });

    } catch (error) {
        console.error('Falló la inicialización del servidor:', error);
    }
};

startServer();

export default app
