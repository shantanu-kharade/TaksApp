import userModel from "../model/userModel.js";

// Get Single User Profile
const getUserService = async (req, res) => {
    try {
        
        const userId = req.user.id; 
        const user = await userModel.findById(userId).select('-password'); 
        
        if (!user) return res.status(404).json({ message: 'User not found' }); 
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
};

// ADMIN ONLY:
const getAllUserService = async (req, res) => {
    try {
        // Aggregation Pipeline to join Users with Tasks and count them
        const users = await userModel.aggregate([
            {
               
                $lookup: {
                    from: 'tasks',       
                    localField: '_id',   
                    foreignField: 'userId', 
                    as: 'userTasks'
                }
            },
            {
                // Project only the fields we need + calculated counts
                $project: {
                    userName: 1,
                    email: 1,
                    role: 1,
                    totalCreatedTasks: { $size: "$userTasks" }, // Count of ALL tasks
                    totalDeletedTasks: {
                        $size: {
                            $filter: {
                                input: "$userTasks",
                                as: "task",
                                cond: { $eq: ["$$task.isDeleted", true] } // Count only isDeleted: true
                            }
                        }
                    }
                }
            }
        ]);

        return res.status(200).json({ message: "Admin Data Retrieved", data: users }); 
    } catch (error) {
        return res.status(500).json({ error: error.message }); 
    }
};

export { getUserService, getAllUserService };