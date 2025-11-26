import { createTaskService, getTaskService, updateTaskService, deleteTaskService } from '../service/taskService.js';


const createTask = async (req, res) => await createTaskService(req, res); 
const getTask = async (req, res) => await getTaskService(req, res);
const updateTask = async (req, res) => await updateTaskService(req, res);
const deleteTask = async (req, res) => await deleteTaskService(req, res); 

export { createTask, getTask, updateTask, deleteTask };