import taskModel from "../model/taskModel.js";
import userModel from "../model/userModel.js";

const createTaskService = async (req, res) => {
    try {
        const userId = req.user.id; 
        const { taskName, description } = req.body;

        const newTask = new taskModel({
            taskName,
            description,
            userId
        });
        
        await newTask.save(); [cite_start]
        return res.status(201).json({ message: "Task Created", task: newTask });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getTaskService = async (req, res) => {
    try {
        const userId = req.user.id;
       
        const tasks = await taskModel.find({ userId: userId, isDeleted: false }); 
        
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateTaskService = async (req, res) => {
    try {
        const userId = req.user.id;
        const { taskId } = req.query; 
        const { taskName, description } = req.body;

        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, userId: userId, isDeleted: false }, 
            { taskName, description },
            { new: true } 
        );

        if (!task) return res.status(404).json({ message: 'Task not found or deleted' }); 
        return res.status(200).json({ message: "Task Updated", task });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const deleteTaskService = async (req, res) => {
    try {   
        const userId = req.user.id;
        const { taskId } = req.query; 

        // Soft Delete
        const task = await taskModel.findOneAndUpdate(
            { _id: taskId, userId: userId },
            { isDeleted: true },
            { new: true }
        );

        if (!task) return res.status(404).json({ message: 'Task not found' }); 
        return res.status(200).json({ message: "Task Soft Deleted", task });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export { createTaskService, getTaskService, updateTaskService, deleteTaskService };