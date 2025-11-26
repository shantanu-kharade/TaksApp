import { Router } from 'express';
import { createTask, getTask, updateTask, deleteTask } from '../controller/taskController.js';
import { authenticateToken } from '../middleware/middleware.js';

const taskRouter = Router();

taskRouter.post('/create', authenticateToken, createTask); 
taskRouter.get('/get', authenticateToken, getTask);
taskRouter.put('/update', authenticateToken, updateTask);
taskRouter.delete('/delete', authenticateToken, deleteTask);   

export default taskRouter;