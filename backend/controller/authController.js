import { registerService, loginService } from '../service/authService.js';

const registerUser = async (req, res) => await registerService(req, res);
const loginUser = async (req, res) => await loginService(req, res);

export { registerUser, loginUser };