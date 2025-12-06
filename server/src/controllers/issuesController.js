import * as issueService from '../services/issues.service.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const createIssue = async (req, res) => {
  try {
    // Delegamos al servicio. req.user viene del middleware
    const issue = await issueService.createIssue(req.body, req.user);
    return ApiResponse.success(res, issue, "Issue created successfully", 201);
  } catch (error) {
    // Si es error de validación de Mongoose
    if (error.name === 'ValidationError') {
      return ApiResponse.error(res, "Validation Error", 400, error);
    }
    const status = error.message === "Device not found" ? 404 : 500;
    return ApiResponse.error(res, error.message, status, error);
  }
};

export const getIssues = async (req, res) => {
  try {
    const issues = await issueService.getIssues(req.user);
    return ApiResponse.success(res, issues, "Issues retrieved successfully");
  } catch (error) {
    return ApiResponse.error(res, error.message, 500, error);
  }
};

export const getIssue = async (req, res) => {
  try {
    const issue = await issueService.getIssueById(req.params.id, req.user);
    return ApiResponse.success(res, issue, "Issue retrieved successfully");
  } catch (error) {
    const status = error.message === "ACCESS_DENIED" ? 403 :
      error.message === "Issue not found" ? 404 : 500;
    return ApiResponse.error(res, error.message, status, error);
  }
};

export const updateIssue = async (req, res) => {
  try {
    const issue = await issueService.updateIssue(req.params.id, req.body);
    return ApiResponse.success(res, issue, "Issue updated successfully");
  } catch (error) {
    return ApiResponse.error(res, error.message, 404, error);
  }
};

export const deleteIssue = async (req, res) => {
  try {
    await issueService.deleteIssue(req.params.id);
    return ApiResponse.success(res, null, "Issue removed successfully");
  } catch (error) {
    return ApiResponse.error(res, error.message, 500, error);
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
    return ApiResponse.success(res, updatedIssue, "Note added successfully");
  } catch (error) {
    return ApiResponse.error(res, error.message, 500, error);
  }
};

export const editNote = async (req, res) => {
  try {
    const note = await issueService.editNote(req.params.noteId, req.body.content);
    return ApiResponse.success(res, note, "Note updated successfully");
  } catch (error) {
    return ApiResponse.error(res, error.message, 500, error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const issue = await issueService.deleteNoteFromIssue(req.params.id, req.params.noteId);
    return ApiResponse.success(res, issue, "Note deleted successfully");
  } catch (error) {
    return ApiResponse.error(res, error.message, 500, error);
  }
};

export const addManagement = async (req, res) => {
  try {
    const issue = await issueService.addManagementToIssue(req.params.id, req.body);
    return ApiResponse.success(res, issue, "Management info added successfully");
  } catch (error) {
    return ApiResponse.error(res, error.message, 500, error);
  }
};