import mongoose from "mongoose";

const deviceStatusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Ej: 'working', 'damaged'
        trim: true,
        unique: true,
        lowercase: true
    },
    code: {
        type: String,
        required: true, // Ej: 'WORKING', 'DAMAGED'
        unique: true,
        uppercase: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    }
}, { versionKey: false });

const DeviceStatus = mongoose.model('DeviceStatus', deviceStatusSchema);

export default DeviceStatus;