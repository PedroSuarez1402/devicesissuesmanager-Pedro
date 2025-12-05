import { Router } from 'express';
import {
    getIssues, getIssue,
    createIssue, updateIssue,
    deleteIssue, addNote, editNote, deleteNote, addManagement
} from '../../../controllers/issuesController.js';
import authMiddleware from '../../../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware(['admin', 'student']), getIssues);
router.get('/:id', authMiddleware(['admin', 'student']), getIssue);
router.post('/', authMiddleware(['admin', 'student']), createIssue);
router.put('/:id', authMiddleware(['admin', 'student']), updateIssue);
router.delete('/:id', authMiddleware(['admin', 'student']), deleteIssue);

// Sub-recursos (Notas y Gestión)
router.post('/:id/addNote', authMiddleware(['admin']), addNote);
router.put('/:id/notes/:noteId', authMiddleware(['admin']), editNote);
router.delete('/:id/notes/:noteId', authMiddleware(['admin']), deleteNote);
router.post('/:id/addManagement', authMiddleware(['admin']), addManagement);

export default router;