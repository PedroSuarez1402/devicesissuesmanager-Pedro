import mongoose from "mongoose";
import { MONGO_URI } from "./index.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);

        console.log(`MongoDB Conectado en: ${conn.connection.host}`);
        //Manejo de eventos de error despues de la conexion inicial
        mongoose.connection.on('error', err => {
            console.log(`Error de conexion a la base de datos: ${err.message}`);
            process.exit(1);
        })
    } catch (error) {
        console.error(`Error de conexion a la base de datos: ${error.message}`);
        process.exit(1);
    }
};