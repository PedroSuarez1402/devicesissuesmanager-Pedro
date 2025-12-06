import * as userService from '../services/users.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        if (!name || !email || !password) {
            return ApiResponse.error(res, "Todos los campos son obligatorios.", 400);
        }
        
        const newUser = await userService.createUser(req.body);
        // Respuesta sin contraseña
        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };

        return ApiResponse.success(res, userResponse, "Usuario creado correctamente", 201);
    } catch (err) {
        const status = err.message.includes("Ya existe") ? 400 : 500;
        return ApiResponse.error(res, err.message, status, err);
    }
};


// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return ApiResponse.success(res, users, "Lista de usuarios obtenida");

    } catch (err) {
        return ApiResponse.error(res, err.message, 500, err);
    }
};

// Controlador para obtener un usuario por su ID
export const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        return ApiResponse.success(res, user, "Usuario encontrado");
    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};

// Controlador para actualizar la información de un usuario
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        const userResponse = { 
            id: updatedUser._id, 
            name: updatedUser.name, 
            email: updatedUser.email, 
            role: updatedUser.role 
        };
        return ApiResponse.success(res, userResponse, "Usuario actualizado correctamente");
    } catch (err) {
        const status = err.message === "Usuario no encontrado." ? 404 : 400;
        return ApiResponse.error(res, err.message, status, err);
    }
};

// Controlador para eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        return ApiResponse.success(res, null, "Usuario eliminado correctamente.");
    } catch (err) {
        return ApiResponse.error(res, err.message, 404, err);
    }
};