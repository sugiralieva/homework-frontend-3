'use client'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import axios from "axios";

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setToken } = useUser();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                'https://dummyjson.com/auth/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = res.data
            if (data.token) {
                setToken(data.token);
                router.push('/posts');
            } else {
                console.error('Токен не найден в ответе:', data); // Добавлено для отладки

            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Неверное имя пользователя или пароль');
        }
    };

    return (
        <div className='bg-white flex items-center justify-center min-h-screen'>
        <form onSubmit={handleLogin} className='bg-gray-100 p-8 rounded shadow-md w-full max-w-sm'>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username:</label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:input-focused'
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password:</label>
                <input
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:input-focused'
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='flex items-center justify-between'>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit">Login</button>
            </div>
        </form>
        </div>
    );
};

export default Login;
