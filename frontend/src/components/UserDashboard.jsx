import { useState, useEffect } from 'react';
import api from '../utils/api.js';

const UserDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ taskName: '', description: '' });

    // State for managing the Edit Mode
    const [editingTask, setEditingTask] = useState(null); // Holds the task currently being edited

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/task/get');
            setTasks(data);
        } catch (e) { console.error("Error fetching tasks"); }
    };

    useEffect(() => { fetchTasks(); }, []);

    // --- CREATE LOGIC ---
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/task/create', newTask);
            setNewTask({ taskName: '', description: '' });
            fetchTasks();
        } catch (error) {
            alert("Failed to create task");
        }
    };

    // --- DELETE LOGIC ---
    const handleDelete = async (taskId) => {
        if (confirm("Are you sure you want to delete this task?")) {
            try {
                await api.delete(`/task/delete?taskId=${taskId}`);
                fetchTasks();
            } catch (error) {
                alert("Failed to delete task");
            }
        }
    };

    // --- UPDATE LOGIC ---
    const startEditing = (task) => {
        setEditingTask(task)
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            await api.put(`/task/update?taskId=${editingTask._id}`, {
                taskName: editingTask.taskName,
                description: editingTask.description
            });
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            alert("Failed to update task");
        }
    };

    return (
        <div className="space-y-6 relative">
            {/* 1. CREATE TASK FORM */}
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Task</h3>
                <div className="flex gap-4 flex-col md:flex-row">
                    <input
                        type="text" placeholder="Task Name"
                        className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={newTask.taskName}
                        onChange={e => setNewTask({ ...newTask, taskName: e.target.value })}
                    />


                    <input
                        type="text" placeholder="Description"
                        className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={newTask.description}
                        onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                    />


                    <button
                        onClick={handleCreate}
                        className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-600 transition"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* 2. TASK LIST */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.length > 0 ? tasks.map(task => (
                    <div key={task._id} className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition flex flex-col justify-between">
                        <div>

                            <h4 className="font-bold text-gray-800 text-lg">{task.taskName}</h4>
                            <p className="text-gray-600 mt-1">{task.description}</p>
                            <span className="text-xs text-gray-400 mt-3 block">Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                            {/* Edit Button */}
                            <button
                                onClick={() => startEditing(task)}
                                className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </button>


                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(task._id)}
                                className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>

                                Delete
                            </button>
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-500 col-span-3 text-center py-10">No tasks found. Create one above!</p>
                )}
            </div>

            {/* 3. EDIT MODAL*/}
            {editingTask && (
                <div className="fixed inset-0 bg   flex items-center justify-center p-4 z-50 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">

                        <h3 className="text-xl font-bold text-gray-900 mb-4">Update Task</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Task Name</label>
                                <input
                                    type="text"

                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    value={editingTask.taskName}
                                    onChange={(e) => setEditingTask({ ...editingTask, taskName: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    rows="3"
                                    value={editingTask.description}
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"

                                    onClick={() => setEditingTask(null)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;