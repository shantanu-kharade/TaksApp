import { Router } from 'express';
import { getUser, getAllUser } from '../controller/userController.js';
import { authenticateToken, authorizeRole } from '../middleware/middleware.js';

const userRouter = Router();


userRouter.get('/profile', authenticateToken, getUser);

// Only 'admin' can access this
userRouter.get('/admin/all-users', authenticateToken, authorizeRole(['admin']), getAllUser); 

export default userRouter;