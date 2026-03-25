import { Router } from 'express';
import { getMessages, createMessage } from '../controllers/messageController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Public route to submit a form
router.post('/', createMessage);

// Protected route to read messages
router.get('/', authenticateToken, getMessages);

export default router;
