import { Router } from 'express';
import { loginUser, registerUser, logoutUser } from '../controller/authController.js';
import { validateUserBody } from '../model/userModel.js';
const authRouter = Router();

authRouter.post('/register', validateUserBody, registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

export default authRouter;
