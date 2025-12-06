import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { ApiResponse } from '../utils/apiResponse.js';

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return ApiResponse.error(res, "Acceso no autorizado. Token faltante.", 401);
            }

            const token = authHeader.split(' ')[1];
        
            /* console.log('La llave secreta es:', process.env.KEY); */
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return ApiResponse.error(res, "Token inválido. Usuario no encontrado.", 401);
            }
            // Validacion de roles 
            if(roles.length > 0 && !roles.includes(user.role)){
                return ApiResponse.error(res, "No tienes permiso para esta acción.", 403);
            }

            // Guardar user en req.user para usarlo en controladores
            req.user = user;

            next();
        } catch (error) {
            return ApiResponse.error(res, "Token no válido o expirado", 401, error);
        }
    }
}

export default authMiddleware;