import mongoose from 'mongoose';
import { MONGO_URI } from '../../config/index.js'; // Importamos la variable de entorno
import { seedIssueStatus } from './01_issueStatuses.seed.js';
import { seedDeviceStatus } from './02_deviceStatuses.seed.js';

const runSeeds = async () => {
    try {
        // Conectar a la base de datos
        if (!MONGO_URI) {
            throw new Error("MONGO_URI no está definida en el archivo .env");
        }

        await mongoose.connect(MONGO_URI);
        console.log('Conectado a MongoDB para ejecutar seeders...');

        // Ejecutar los seeders en orden
        await seedIssueStatus();
        await seedDeviceStatus();

        console.log('Todos los seeders se ejecutaron con éxito.');
        process.exit(0); // Salir con código de éxito
    } catch (error) {
        console.error('Error al ejecutar seeders:', error);
        process.exit(1); // Salir con código de error
    }
};

runSeeds();