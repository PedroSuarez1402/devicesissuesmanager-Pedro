import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES, JWT_SECRET } from "../config/index.js";

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES || "1d" }
    );
};

export const register = async ({ name, email, password, role }) => {
    //Validar duplicados
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("Ya existe un usuario con este correo.");
    }
    // Crear el usuario (el hash lo hace el modelo)
    const newUser = await User.create({
        name,
        email,
        password,
        role: role || "student",
    });

    const token = generateToken(newUser);

    return { newUser, token };
}

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Credenciales incorrectas");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Credenciales incorrectas");
    }
    const token = generateToken(user);
    return { user, token };
}

export const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error("Usuario no encontrado");
    return user;
}