import { useState, useEffect } from 'react';
import api from '../utils/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await api.get('/user/admin/all-users');
                setUsers(data.data);
            } catch (err) {
                console.error('Failed to load admin data');
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">User Statistics</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>

                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Active Tasks</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-red-500 uppercase tracking-wider">Deleted Tasks</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(user => (

                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.userName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-bold">{user.totalCreatedTasks}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-red-600 font-bold bg-red-50">{user.totalDeletedTasks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;