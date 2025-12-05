import { Router } from "express";
import { getDevices, getDevice, createDevice, updateDevice, deleteDevice } from "../../../controllers/devicesController.js";
import authMiddleware from "../../../middleware/authMiddleware.js";

const router = Router()

// Rutas limpias: ya no necesitas poner '/devices' aquí, eso lo define el index padre
router.get('/', authMiddleware(['admin', 'student']), getDevices);
router.get('/:id', authMiddleware(['admin', 'student']), getDevice);
router.post('/', authMiddleware(['admin']), createDevice);
router.put('/:id', authMiddleware(['admin']), updateDevice);
router.delete('/:id', authMiddleware(['admin']), deleteDevice);

export default router;