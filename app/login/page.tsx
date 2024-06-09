'use client'
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { setToken } = useUser();
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                console.error('Ошибка сети:', response.status, response.statusText);
                alert('Неверное имя пользователя или пароль');
                return;
            }

            const data = await response.json();
            console.log('Ответ от сервера:', data); // Добавлено для отладки

            if (data.token) {
                setToken(data.token);
                router.push('/');
            } else {
                console.error('Токен не найден в ответе:', data); // Добавлено для отладки
                alert('Неверное имя пользователя или пароль');
            }
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            alert('Ошибка при авторизации');
        }
    };

    return (
        <form onSubmit={handleLogin} className='flex-col min-h-screen'>
            <div>
                <label htmlFor="username">Имя пользователя:</label>
                <input
                    className={'text-black'}
                    id="username"
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password">Пароль:</label>
                <input
                    className='text-black'
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className='bg-blue-600' type="submit">Войти</button>
        </form>
    );
};

export default Login;
