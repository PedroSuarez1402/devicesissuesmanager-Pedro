import * as roomService from '../services/rooms.service.js';

export const createRoom = async (req, res) => {
    try {
        const room = await roomService.createRoom(req.body);
        return res.status(201).json({ success: true, message: 'Sala creada', data: room });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: 'Sala duplicada' });
        return res.status(500).json({ success: false, message: err.message });
    }
};

export const getRoom = async (req, res) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        return res.json({ success: true, data: room });
    } catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms();
        return res.json({ success: true, total: rooms.length, data: rooms });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const room = await roomService.updateRoom(req.params.id, req.body);
        return res.json({ success: true, message: 'Sala actualizada', data: room });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        await roomService.deleteRoom(req.params.id);
        return res.json({ success: true, message: 'Sala eliminada' });
    } catch (err) {
        return res.status(404).json({ success: false, message: err.message });
    }
};