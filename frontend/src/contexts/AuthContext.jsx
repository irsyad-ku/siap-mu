import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // Verify token on mount
    useEffect(() => {
        const verifyAuth = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await api.get('/user');
                setUser(res.data.data || res.data);
                localStorage.setItem('user', JSON.stringify(res.data.data || res.data));
            } catch {
                // Token invalid — clear auth
                logout();
            } finally {
                setLoading(false);
            }
        };
        verifyAuth();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const login = useCallback(async (email, password) => {
        const res = await api.post('/login', { email, password });
        const { token: newToken, user: userData } = res.data.data || res.data;
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(userData));
        return userData;
    }, []);

    const register = useCallback(async (formData) => {
        const res = await api.post('/register', formData);
        return res.data;
    }, []);

    const logout = useCallback(async () => {
        try {
            await api.post('/logout');
        } catch {
            // Ignore logout errors
        } finally {
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }, []);

    const isAdmin = user?.role === 'admin';
    const isPengurus = user?.role === 'pengurus';
    const isWarga = user?.role === 'warga';
    const isAuthenticated = !!token && !!user;

    return (
        <AuthContext.Provider value={{
            user, token, loading, isAuthenticated,
            isAdmin, isPengurus, isWarga,
            login, register, logout, setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
