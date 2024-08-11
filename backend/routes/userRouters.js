import express from 'express'
import { registerUser, loginUser, getMe } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', protect, getMe)
router.route('/').post(registerUser)
router.route('/login').post(loginUser)

export default router;