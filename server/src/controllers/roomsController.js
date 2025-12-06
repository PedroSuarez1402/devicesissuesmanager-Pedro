import * as roomService from '../services/rooms.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);
        return ApiResponse.success(res, room, 'Sala creada correctamente', 201);
    } catch (err) {
        if (err.code === 11000) {
            return ApiResponse.error(res, 'Ya existe una sala con el mismo nombre en esta torre', 400, err);
        }
        return ApiResponse.error(res, err.message, 500, err);
    }
};

export const getRoom = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        return ApiResponse.success(res, room, 'Sala obtenida correctamente');
    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        return ApiResponse.success(res, rooms, 'Salas obtenidas correctamente');
    } catch (err) {
        return ApiResponse.error(res, err.message, 500, err);
    }
};

export const updateRoom = async (req, res) => {
    try {
        const room = await roomService.updateRoom(req.params.id, req.body);
        return ApiResponse.success(res, room, 'Sala actualizada correctamente');
    } catch (err) {
        return ApiResponse.error(res, err.message, 400, err);
    }
};

export const deleteRoom = async (req, res) => {
    try {
        await roomService.deleteRoom(req.params.id);
        return ApiResponse.success(res, null, 'Sala eliminada correctamente');
    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};