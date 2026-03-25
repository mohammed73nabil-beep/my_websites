import express from 'express';
import { uploadImage } from '../controllers/uploadController';
import { authenticateToken } from '../middlewares/authMiddleware';
import multer from 'multer';

const router = express.Router();
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});

// Upload an image (requires authentication)
router.post('/', authenticateToken, upload.single('image'), uploadImage);

export default router;
