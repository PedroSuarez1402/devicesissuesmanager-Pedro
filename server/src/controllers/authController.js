import * as authService from '../services/auth.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

/* Register endpoint */
export const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        // Validacion
        if (!name || !email || !password) {
            return ApiResponse.error(res, "Todos los campos son obligatorios.", 400);
        }

        // utilizar el servicio para registrar al usuario
        const { newUser, token } = await authService.register({ name, email, password, role });

        const responseData = {
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        };

        return ApiResponse.success(res, responseData, "Usuario registrado correctamente", 201);

    } catch (error) {
        // Manejo simple de errores conocidos vs internos
        const status = error.message === "El usuario ya existe." ? 400 : 500;
        return ApiResponse.error(res, error.message, status, error);
    }
}
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return ApiResponse.error(res, "Credenciales incorrectas", 400);
        }

        const { user, token } = await authService.login({ email, password });
        
        const responseData = {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };

        return ApiResponse.success(res, responseData, "Login exitoso", 200);

    } catch (error) {
        const status = error.message === "Credenciales incorrectas" ? 401 : 500;
        return ApiResponse.error(res, error.message, status, error);
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);
        
        return ApiResponse.success(res, user, "Información de usuario obtenida");
        
    } catch (error) {
        return ApiResponse.error(res, error.message, 404, error);
    }
}

export const logoutUser = async (req, res) => {
    try {
        return ApiResponse.success(res, null, "Logout exitoso");
    } catch (error) {
        return ApiResponse.error(res, error.message, 500, error);
    }
}
