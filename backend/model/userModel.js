import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, enum : ['admin', 'user'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);

export default userModel;

export const validateUserBody = (req, res, next) => {
    const {userName, email, password, role} = req.body;
    if (!userName || !email || !password || !role) {
        return res.status(400).json({message: 'Missing required fields: userName, email, password, or role'});
    }
    next();   
}