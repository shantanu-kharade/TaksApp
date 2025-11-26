import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import UserDashboard from '../components/UserDashboard.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-indigo-500 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">

                        <div className="shrink-0 flex items-center">
                            <h1 className="text-white text-xl font-bold">TaskMaster</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-indigo-100 text-sm">Welcome, {user?.userName} ({user?.role})</span>
                            <button
                                onClick={logout}

                                className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
            </main>
        </div>
    );
};

export default Dashboard;