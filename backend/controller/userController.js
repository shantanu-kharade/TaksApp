import { getUserService, getAllUserService } from '../service/userService.js';

const getUser = async (req, res) => {
    await getUserService(req, res); 
};

const getAllUser = async (req, res) => {
    await getAllUserService(req, res); 
};

export { getUser, getAllUser };