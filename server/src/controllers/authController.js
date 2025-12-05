import * as authService from '../services/auth.service.js';

/* Register endpoint */
export const registerUser = async (req, res) => {
    try{
        const { name, email, password, role } = req.body;
        // Validacion
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // utilizar el servicio para registrar al usuario
        const { newUser, token } = await authService.register({ name, email, password, role });

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
        // Manejo simple de errores conocidos vs internos
        const status = error.message === "El usuario ya existe." ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
}
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        const { user, token } = await authService.login({ email, password });
        
        res.json({
            message: "Login exitoso",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        const status = error.message === "Credenciales incorrectas" ? 401 : 500;
        res.status(status).json({ message: error.message });
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id);
        
        res.json(user)
        
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.json({ message: "Logout exitoso" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
