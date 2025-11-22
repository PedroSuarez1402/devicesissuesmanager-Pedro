import jwt  from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from "../models/user.js";

// Generar el token
const generateToken = (user) => {
    return jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES || '1d'}
    )
}
/* Register endpoint */
const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        // Validacion
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Verificar si el usuario ya existe en la base de datos
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "El usuario ya existe." });
        }

        // Crear el nuevo usuario
        const newUser = await User.create({
            name,
            email,
            password,
            role: role || 'admin',
        });
        // Token
        const token = generateToken(newUser);

        res.status(201).json({
            message: "Usuario registrado correctamente",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        const token = generateToken(user);

        res.json({
            message: "Login exitoso",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(user)
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const logoutUser = async (req, res) => {
    try {
        
        res.json({ message: "Logout exitoso" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {
    registerUser,
    loginUser,
    getMe,
    logoutUser,
};