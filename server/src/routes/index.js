import { Router } from 'express';
import v1Routes from './apis/v1/index.js'; // Importamos todo el bloque v1

const routes = (app) => {
    // Creamos un router global para la API
    const apiRouter = Router();

    // Montamos la versión 1
    apiRouter.use('/v1', v1Routes);

    // Montamos todo bajo '/api'
    // Esto resultará en rutas tipo: http://localhost:5001/api/v1/devices
    app.use('/api', apiRouter);
    
    // (Opcional) Ruta base de salud para verificar que el API vive
    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK', env: process.env.NODE_ENV });
    });
};

export default routes;