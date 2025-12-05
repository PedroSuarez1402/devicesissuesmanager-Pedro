import { Router } from 'express';
import { getRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../../../controllers/roomsController.js';
import authMiddleware from '../../../middleware/authMiddleware.js';

const router = Router();

router.get('/', authMiddleware(['admin', 'student']), getRooms);
router.get('/:id', authMiddleware(['admin', 'student']), getRoom);
router.post('/', authMiddleware(['admin']), createRoom);
router.put('/:id', authMiddleware(['admin']), updateRoom);
router.delete('/:id', authMiddleware(['admin']), deleteRoom);

export default router;