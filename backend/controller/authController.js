import { loginService, registerService, logoutService } from '../service/authService.js';

const loginUser = async (req, res) => {
    try {
        const userLogin = await loginService(req, res);
        res.status(200).json(userLogin);
    } catch (error) {
        res.status(400).json(error);
    }
}

const registerUser = async (req, res) => {
    try {
        const userRegister = await registerService(req, res);
        res.send(userRegister);
    } catch (error) {
        res.status(400).json(error);
    }
}

const logoutUser = async (req, res) => {
    try {
        const userLogout = await logoutService(req, res);
        res.status(200).json(userLogout);
    } catch (error) {
        res.status(400).json(error);
    }
}

export {
    loginUser,
    registerUser,
    logoutUser
}