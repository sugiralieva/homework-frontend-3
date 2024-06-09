'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem('token');
            if (token) {
                setUser({ token });
            }
        }
    }, []);

    const setToken = (token: string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem('token', token);
            setUser({ token });
        }
    };

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('token');
            setUser(null);
        }
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
