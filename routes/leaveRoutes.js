import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addLeave, getLeaves, getAllLeaves, getDetails, updateLeave } from '../controllers/leaveController.js';



const router = express.Router();

router.post('/add', authMiddleware, addLeave);
router.get('/:id', authMiddleware, getLeaves);
router.put('/:id', authMiddleware, updateLeave);
router.get('/detail/:id', authMiddleware, getDetails);
router.get('/', authMiddleware, getAllLeaves);

export default router;