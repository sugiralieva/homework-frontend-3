'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
    token: string;
}

interface UserContextType {
    user: User | null;
    setToken: (token: string) => void;
    logout: () => void;
}

const defaultUserContext: UserContextType = {
    user: null,
    setToken: () => {},
    logout: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem('token');
        return token ? { token } : null;
    });

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    return useContext(UserContext);
};
