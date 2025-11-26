import { useState } from 'react';
import api from '../utils/api.js';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ userName: '', email: '', password: '', role: 'user' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Error registering');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-900">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text" placeholder="Username" required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={e => setFormData({ ...formData, userName: e.target.value })} />

                    <input
                        type="email" placeholder="Email" required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password" placeholder="Password" required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                    />
                    <select
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700">
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">

                    Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;