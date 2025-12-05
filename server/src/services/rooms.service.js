import Room from '../models/room.js';

export const createRoom = async (data) => {
    return await Room.create(data);
};

export const getRoomById = async (id) => {
    const room = await Room.findById(id);
    if (!room) throw new Error("Sala no encontrada");
    return room;
};

export const getAllRooms = async () => {
    return await Room.find();
};

export const updateRoom = async (id, data) => {
    const room = await Room.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!room) throw new Error("Sala no encontrada");
    return room;
};

export const deleteRoom = async (id) => {
    const room = await Room.findByIdAndDelete(id);
    if (!room) throw new Error("Sala no encontrada");
    return room;
};