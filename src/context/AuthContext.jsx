    /* eslint-disable react-refresh/only-export-components */
    import React, { createContext, useState, useContext } from 'react';
    import authService from '../services/authService';

    const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => authService.getCurrentUser());
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        try {
        const userData = await authService.login(email, password);
        setUser(userData);
        return userData;
        } finally {
        setLoading(false);
        }
    };

    const register = async (name, email, password) => {
        setLoading(true);
        try {
        const userData = await authService.register(name, email, password);
        setUser(userData);
        return userData;
        } finally {
        setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };

    export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
    };