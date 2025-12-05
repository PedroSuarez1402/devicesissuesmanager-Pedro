import * as issueService from '../services/issues.service.js';

export const createIssue = async (req, res) => {
  try {
    // Delegamos al servicio. req.user viene del middleware
    const issue = await issueService.createIssue(req.body, req.user);
    return res.status(201).json(issue);
  } catch (error) {
    // Si es error de validación de Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Error de validación", errors: error.message });
    }
    const status = error.message === "Device not found" ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await issueService.getIssues(req.user);
    return res.json(issues);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getIssue = async (req, res) => {
  try {
    const issue = await issueService.getIssueById(req.params.id, req.user);
    return res.json(issue);
  } catch (error) {
    const status = error.message === "ACCESS_DENIED" ? 403 :
      error.message === "Issue not found" ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const updateIssue = async (req, res) => {
  try {
    const issue = await issueService.updateIssue(req.params.id, req.body);
    return res.json(issue);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    await issueService.deleteIssue(req.params.id);
    return res.json({ message: "Issue removed" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// --- Sub-Controladores ---

export const addNote = async (req, res) => {
  try {
    const updatedIssue = await issueService.addNoteToIssue(
      req.params.id,
      req.body.content,
      req.user.name
    );
    return res.json(updatedIssue);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const editNote = async (req, res) => {
  try {
    const note = await issueService.editNote(req.params.noteId, req.body.content);
    return res.json(note);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const issue = await issueService.deleteNoteFromIssue(req.params.id, req.params.noteId);
    return res.json(issue);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const addManagement = async (req, res) => {
  try {
    const issue = await issueService.addManagementToIssue(req.params.id, req.body);
    return res.json(issue);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};