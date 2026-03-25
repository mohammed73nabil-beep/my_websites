import { Router } from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/', authenticateToken, createProject);
router.put('/:id', authenticateToken, updateProject);
router.delete('/:id', authenticateToken, deleteProject);

export default router;
