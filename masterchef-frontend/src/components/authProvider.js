import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken } from '../backend_api/api';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if(token) {
            setIsAuthenticated(true);
            setAuthToken(token);
        }
    },[]);

    const login = (token, username, id) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
        setUsername(username);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.clear();
        setUsername();
    };

    const value = {
        isAuthenticated,
        username,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>
}