import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const registerService = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;

        // Check if user exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User (Role defaults to 'user' in model if not provided)
        user = new userModel({
            userName,
            email,
            password: hashedPassword,
            role: role || 'user' 
        });

        await user.save();

        // Remove password from response
        user.password = undefined;
        return res.status(201).json({ message: "User Registered Successfully", user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const loginService = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find User
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate Token
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({ 
            message: "Login Successful", 
            token, 
            user: { id: user._id, userName: user.userName, role: user.role } 
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { registerService, loginService };