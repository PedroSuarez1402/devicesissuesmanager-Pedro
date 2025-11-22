// Importación del modelo User
import User from '../models/user.js';

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }
        // Verificar duplicado
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Ya existe un usuario con este correo." });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            role: role || "student"
        });
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
        return res.status(500).json({ message: err.message });
    }
};


// Controlador para obtener todos los usuarios
const getUsers = async (_, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await User.find().select('-password');

        // Enviar la lista de usuarios como respuesta
        res.json(users);
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        res.status(500).json({ message: err.message });
    }
};

// Controlador para obtener un usuario por su ID
const getUser = async (req, res) => {
    try {
        // Buscar al usuario por su ID en la base de datos
        const user = await User.findById(req.params.id).select('-password');

        // Verificar si el usuario fue encontrado
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Enviar el usuario como respuesta
        return res.json(user);
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Controlador para actualizar la información de un usuario
const updateUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
    
        // Buscar al usuario por su ID en la base de datos
        const user = await User.findById(req.params.id);

        // Verificar si el usuario fue encontrado
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        // Verificar email duplicado SOLO si cambia el email
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: "Ya existe un usuario con este correo." });
            }
            user.email = email;
        }

        // Actualizar la información del usuario con los nuevos datos
        user.name = name || user.name;
        user.role = role || user.role;

        // Solo encriptar si llega password
        if (password) {
            user.password = password;
        }

        // Guardar los cambios en la base de datos
        await user.save();

        const responseUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Enviar el usuario actualizado como respuesta
        return res.json({
            message: "Usuario actualizado correctamente",
            user: responseUser
        });
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Controlador para eliminar un usuario por su ID
const deleteUser = async (req, res) => {
    try {
        // Buscar al usuario por su ID en la base de datos
        const user = await User.findByIdAndDelete(req.params.id);

        // Verificar si el usuario fue encontrado
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Enviar una respuesta indicando que el usuario fue eliminado
        return res.json({ message: "Usuario eliminado correctamente." });
    } catch (err) {
        // Enviar una respuesta de error en caso de algún problema
        return res.status(500).json({ message: err.message });
    }
};

// Exportar los controladores para su uso en otros archivos
export {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
