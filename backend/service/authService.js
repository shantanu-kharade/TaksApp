import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config'

const loginService = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token })

    } catch (error) {
        res.status(400).json(error);
    }
}

const registerService = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new userModel({
            userName: userName,
            email: email,
            password: hashedPassword,
            role: role
        });

        user = await user.save();
        if (!user) {
            return res.status(400).json({ message: 'Error creating user' });
        }

        user.password = undefined;
        res.status(201).json({ message: "User Created Successfully", user });
    } catch (error) {
        res.status(400).json(error);
    }
}

const logoutService = async (req, res) => {
    try {
        res.json({ message: "User logged out successfully" });
    }
    catch (error) {
        res.send(error.message);
    }
}
export {
    loginService,
    registerService,
    logoutService
};