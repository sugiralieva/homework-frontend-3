'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const LogOut: React.FC = () => {
    const { logout } = useUser();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className='mx-auto flex justify-end'>
        <button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Logout
        </button>
        </div>
    );
};

export default LogOut;
