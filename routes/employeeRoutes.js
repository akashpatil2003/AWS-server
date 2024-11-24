import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { addEmployee, upload, getEmployees, viewEmployee, updateEmployee, fetchEmployeesByDepId } from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', authMiddleware, getEmployees);
router.post('/add', authMiddleware, upload.single('image'), addEmployee);
router.get('/:id', authMiddleware, viewEmployee);
router.put('/:id', authMiddleware, updateEmployee);
router.get('/department/:id', authMiddleware, fetchEmployeesByDepId);

export default router;