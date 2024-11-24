import express from 'express';
import cors from 'cors';
import connectMongo from './db/connectMongo.js';
import authRouter from './routes/authRoutes.js';
import departmentRouter from './routes/departmentRoutes.js';
import employeeRouter from './routes/employeeRoutes.js';
import salaryRouter from './routes/salaryRoutes.js';
import leaveRouter from './routes/leaveRoutes.js';
import settingRouter from './routes/settingRoutes.js';
import dashboardRouter from './routes/dashboardRouter.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary', salaryRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/setting', settingRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(process.env.PORT, async () => {
  await connectMongo();
  console.log(`Server is running on port ${process.env.PORT}`);
})