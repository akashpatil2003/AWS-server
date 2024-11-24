import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addSalary, getSalary } from '../controllers/salaryController.js';



const router = express.Router();

router.post('/add', authMiddleware, addSalary);
router.get('/:id/:role', authMiddleware, getSalary);

export default router;