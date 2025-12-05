import * as userService from '../services/users.service.js';

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        

        const newUser = await userService.createUser(req.body);
        // Respuesta sin contraseña
        const userResponse = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };

        return res.status(201).json({
            message: "Usuario creado correctamente",
            user: userResponse
        });
    } catch (err) {
        const status = err.message.includes("Ya existe") ? 400 : 500;
        return res.status(status).json({ message: err.message });
    }
};


// Controlador para obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await userService.getAllUsers();

        // Enviar la lista de usuarios como respuesta
        return res.json(users);

    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener un usuario por su ID
export const getUser = async (req, res) => {
    try {
        // Buscar al usuario por su ID en la base de datos
        const user = await userService.getUserById(req.params.id);

        // Enviar el usuario como respuesta
        return res.json(user);
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar la información de un usuario
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        return res.json({ 
            message: "Usuario actualizado", 
            user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role }
        });
    } catch (err) {
        const status = err.message === "Usuario no encontrado." ? 404 : 400;
        return res.status(status).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario por su ID
export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        return res.json({ message: "Usuario eliminado correctamente." });
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};