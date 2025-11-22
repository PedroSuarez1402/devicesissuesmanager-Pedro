import { Router } from "express";
import { getMe, loginUser, registerUser, logoutUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware(), getMe);
router.post('/logout', authMiddleware(), logoutUser);

export default router;