import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    isDeleted: { type: Boolean, default: false }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true }); 

const taskModel = mongoose.model("task", taskSchema);
export default taskModel; 