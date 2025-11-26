// Importación del modelo Room
import Room from '../models/room.js';

// Controlador para crear una nueva habitación
// 📌 Crear Room
export const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Sala creada correctamente',
      data: room
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una sala con el mismo nombre en esta torre'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error al crear la sala',
      error: err.message
    });
  }
};

// Controlador para obtener una habitación por su ID
export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    return res.json({
      success: true,
      data: room
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: 'ID inválido',
      error: err.message
    });
  }
};

// Controlador para obtener todas las habitaciones
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    return res.json({
      success: true,
      total: rooms.length,
      data: rooms
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener salas',
      error: err.message
    });
  }
};


// Controlador para actualizar la información de una habitación
export const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    return res.json({
      success: true,
      message: 'Sala actualizada correctamente',
      data: updatedRoom
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe una sala con ese nombre en esta torre'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la sala',
      error: err.message
    });
  }
};

// Controlador para eliminar una habitación por su ID
export const deleteRoom = async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);

    if (!deletedRoom) {
      return res.status(404).json({
        success: false,
        message: 'Sala no encontrada'
      });
    }

    return res.json({
      success: true,
      message: 'Sala eliminada correctamente'
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error al eliminar la sala',
      error: err.message
    });
  }
};

