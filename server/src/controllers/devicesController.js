import * as deviceService from "../services/devices.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
/* Controlador para crear un nuevo dispositivo */
export const createDevice = async (req, res) => {
    try {
        const { brand, roomId } = req.body;

        if (!brand || !roomId) {
            return ApiResponse.error(res, "Todos los campos son obligatorios.", 400);
        }
        
        const device = await deviceService.createDevice(req.body);

        return ApiResponse.success(res, device, "Device created successfully", 201);

    } catch (err) {
        const status = err.message === "Room not found" ? 404 : 500;
        return ApiResponse.error(res, err.message, status, err);
    }
};
/*  Controlador para obtener un dispositivo por su ID*/
export const getDevice = async (req, res) => {
    try {
        const device = await deviceService.getDeviceById(req.params.id);
            
        return ApiResponse.success(res, device, "Device retrieved successfully");

    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};

/* Controlador para obtener todos los equipos */
export const getDevices = async (req, res) => {
    try {
        const devices = await deviceService.getAllDevices();
            
        const responseData = {
            count: devices.length,
            items: devices
        };

        return ApiResponse.success(res, devices, "Devices retrieved successfully"); 

    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};

/* Actualizar equipo */
export const updateDevice = async (req, res) => {
    try {
        const device = await deviceService.updateDevice(req.params.id, req.body);
        return ApiResponse.success(res, device, "Device updated successfully");
    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};
/* funcion para eliminar un equipo por su ID */
export const deleteDevice = async (req, res) => {
    try {
        await deviceService.deleteDevice(req.params.id);
        return ApiResponse.success(res, null, "Device deleted successfully");
    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};