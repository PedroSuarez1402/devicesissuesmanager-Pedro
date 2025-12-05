import Device from '../models/device.js';
import Room from '../models/room.js';

export const createDevice = async ({ brand, description, roomId }) => {
    const room = await Room.findById(roomId);
    if (!room) {
        throw new Error('Room not found');
    }

    return await Device.create({ brand, description, room: room._id });
};

export const getDeviceById = async (id) => {
    const device = await Device.findById(id).populate('room');
    if (!device) {
        throw new Error('Device not found');
    }

    return device;
}

export const getAllDevices = async () => {
    return await Device.find().populate("room").sort({ createdAt: -1 });
};

export const updateDevice = async (id, { brand, description, roomId }) => {
    const device = await Device.findById(id);
    if (!device) throw new Error("Device not found");

    if (roomId) {
        const room = await Room.findById(roomId);
        if (!room) throw new Error("Room not found");
        device.room = room._id;
    }

    if (brand) device.brand = brand;
    if (description) device.description = description;

    await device.save();
    return device;
};

export const deleteDevice = async (id) => {
    const device = await Device.findByIdAndDelete(id);
    if (!device) throw new Error("Device not found");
    return device;
};
