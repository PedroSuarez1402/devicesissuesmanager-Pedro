import * as deviceService from "../services/devices.service.js";
/* Controlador para crear un nuevo dispositivo */
export const createDevice = async (req, res) => {
    try {
        const { brand, roomId } = req.body;

        if (!brand || !roomId) {
            return res.status(400).json({
                message: "brand and roomId are required"
            });
        }
        
        const device = await deviceService.createDevice(req.body);

        return res.status(201).json({
            message: "Device created successfully",
            data: device
        });

    } catch (err) {
        const status = err.message === "Room not found" ? 404 : 500;
        return res.status(status).json({ message: err.message });
    }
};
/*  Controlador para obtener un dispositivo por su ID*/
export const getDevice = async (req, res) => {
    try {
        const device = await deviceService.getDeviceById(req.params.id);
            
        

        return res.json({
            data: device
        });

    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

/* Controlador para obtener todos los equipos */
export const getDevices = async (req, res) => {
    try {
        const devices = await deviceService.getAllDevices();
            
        return res.json({
            count: devices.length,
            data: devices
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

/* Actualizar equipo */
export const updateDevice = async (req, res) => {
    try {
        const device = await deviceService.updateDevice(req.params.id, req.body);
        return res.json({ message: "Device updated", data: device });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};
/* funcion para eliminar un equipo por su ID */
export const deleteDevice = async (req, res) => {
    try {
        await deviceService.deleteDevice(req.params.id);
        return res.json({ message: "Device deleted" });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};