import User from '../models/user.js';

export const createUser = async (data) => {
    const { email } = data;
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("Ya existe un usuario con este correo.");
    
    // Si manejas hash en el modelo, esto funciona directo
    return await User.create(data);
};

export const getAllUsers = async () => {
    return await User.find().select('-password');
};

export const getUserById = async (id) => {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error("Usuario no encontrado.");
    return user;
};

export const updateUser = async (id, data) => {
    const user = await User.findById(id);
    if (!user) throw new Error("Usuario no encontrado.");

    if (data.email && data.email !== user.email) {
        const emailExists = await User.findOne({ email: data.email });
        if (emailExists) throw new Error("Ya existe un usuario con este correo.");
        user.email = data.email;
    }

    if (data.name) user.name = data.name;
    if (data.role) user.role = data.role;
    if (data.password) user.password = data.password; // El modelo debería hashear esto al guardar

    await user.save();
    return user;
};

export const deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("Usuario no encontrado.");
    return user;
};