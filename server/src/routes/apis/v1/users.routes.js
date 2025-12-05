import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../../controllers/usersController.js';
import authMiddleware from '../../../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware(['admin']), getUsers);
router.get('/:id', authMiddleware(['admin']), getUser);
router.post('/', authMiddleware(['admin']), createUser);
router.put('/:id', authMiddleware(['admin']), updateUser);
router.delete('/:id', authMiddleware(['admin']), deleteUser);

export default router;