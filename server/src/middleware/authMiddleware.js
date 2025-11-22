import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: "Acceso no autorizado. Token faltante." });
            }

            const token = authHeader.split(' ')[1];
        
            /* console.log('La llave secreta es:', process.env.KEY); */
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                return res.status(401).json({ message: "Token inválido. Usuario no encontrado." });
            }
            //Validacion de roles 
            if(roles.length > 0 && !roles.includes(user.role)){
                return res.status(403).json({ message: "No tienes permiso para esta acción." });
            }

            // Guardar user en req.user para usarlo en controladores
            req.user = user;

            next();
        } catch (error) {
            return res.status(401).json({
                message: "Token no válido",
                error: process.env.NODE_ENV === "development" ? error.message : undefined
            });
        }
    }
}

export default authMiddleware;