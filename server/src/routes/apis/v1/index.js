import { Router } from 'express';

import authRoutes from './auth.routes.js';
import deviceRoutes from './devices.routes.js';
import roomRoutes from './rooms.routes.js';
import issueRoutes from './issues.routes.js';
import userRoutes from './users.routes.js';

const router = Router();

// Aquí definimos los prefijos de la URL para cada entidad
router.use('/auth', authRoutes);     // URL final: /api/v1/auth/...
router.use('/devices', deviceRoutes); // URL final: /api/v1/devices/...
router.use('/rooms', roomRoutes);     // URL final: /api/v1/rooms/...
router.use('/issues', issueRoutes);   // URL final: /api/v1/issues/...
router.use('/users', userRoutes);     // URL final: /api/v1/users/...

export default router;