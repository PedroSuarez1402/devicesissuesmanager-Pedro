import Issue from '../models/issue.js';
import Device from '../models/device.js';
import Note from '../models/note.js';
// Opcional: Si necesitas validar IDs de catálogos
// import IssueStatus from '../models/catalogs/IssueStatus.js';

export const createIssue = async (data, creatorUser) => {
    const { type, description, deviceStatus, status, deviceId } = data;

    // Validar dispositivo
    const device = await Device.findById(deviceId).exec();
    if (!device) throw new Error("Device not found");

    // Crear Issue
    const issue = await Issue.create({
        creator: {
            id: creatorUser._id,
            name: creatorUser.name,
        },
        device: device._id,
        type,
        description,
        deviceStatus, // Ahora esperamos que esto sea un ID (o el string si no has migrado el front aún)
        status,       // Igual aquí
        notes: [],
        issuesManagement: [],
    });

    return issue;
};

export const getIssues = async (user) => {
    let query = {};
    
    // Regla de negocio: Estudiantes solo ven sus propios issues
    if (user.role === "student") {
        query = { "creator.id": user._id };
    }

    return await Issue.find(query)
        .populate({
            path: "device",
            populate: { path: "room" },
        })
        .populate("notes") // Notas detalladas
        .populate("status") // Si ya usas el catálogo nuevo
        .populate("deviceStatus") // Si ya usas el catálogo nuevo
        .exec();
};

export const getIssueById = async (id, user) => {
    const issue = await Issue.findById(id)
        .populate({
            path: "device",
            populate: { path: "room" },
        })
        .populate("notes")
        .exec();

    if (!issue) throw new Error("Issue not found");

    // Regla de seguridad: Verificar propiedad si es estudiante
    if (user.role === "student" && issue.creator.id.toString() !== user._id.toString()) {
        throw new Error("ACCESS_DENIED");
    }

    return issue;
};

export const updateIssue = async (id, data) => {
    const issue = await Issue.findById(id);
    if (!issue) throw new Error("Issue not found");

    // Actualización selectiva
    if (data.type) issue.type = data.type;
    if (data.description) issue.description = data.description;
    if (data.deviceStatus) issue.deviceStatus = data.deviceStatus;
    if (data.status) issue.status = data.status;

    await issue.save();
    return issue;
};

export const deleteIssue = async (id) => {
    const issue = await Issue.findByIdAndDelete(id);
    if (!issue) throw new Error("Issue not found");
    return issue;
};

// --- Sub-Recursos: Notas ---

export const addNoteToIssue = async (issueId, content, userName) => {
    const issue = await Issue.findById(issueId);
    if (!issue) throw new Error("Issue not found");

    const newNote = await Note.create({
        content,
        creatorName: userName,
    });

    issue.notes.push(newNote._id);
    await issue.save();
    
    // Retornamos el issue actualizado y populado
    return await getIssueById(issueId, { role: 'admin' }); // Hack: Pasamos rol admin para saltar check de seguridad interno
};

export const editNote = async (noteId, content) => {
    const note = await Note.findById(noteId);
    if (!note) throw new Error("Note not found");
    
    note.content = content;
    await note.save();
    return note;
};

export const deleteNoteFromIssue = async (issueId, noteId) => {
    await Note.findByIdAndDelete(noteId);
    
    const issue = await Issue.findByIdAndUpdate(
        issueId,
        { $pull: { notes: noteId } },
        { new: true }
    );
    
    if (!issue) throw new Error("Issue not found");
    return issue;
};

// --- Sub-Recursos: Management ---

export const addManagementToIssue = async (issueId, data) => {
    const issue = await Issue.findById(issueId);
    if (!issue) throw new Error("Issue not found");

    issue.issuesManagement.push({
        responsible: {
            id: data.responsibleId,
            name: data.responsibleName,
        },
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        usedObjects: data.usedObjects,
    });

    if (data.status) issue.status = data.status;

    await issue.save();
    return issue;
};