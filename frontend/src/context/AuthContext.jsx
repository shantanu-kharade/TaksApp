import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"; 
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
               
                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser(decoded);
                }
            } catch (e) {
                console.error("Invalid Token:", e);
                localStorage.removeItem('token');
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        try {
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            return true;
            
        } catch (e) {
            console.error("Login Error (Token Decode):", e);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
       
        window.location.href = '/login'; 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};