'use client'
import { useUser } from '../context/UserContext';

const Logout: React.FC = () => {
    const { logout } = useUser();

    return (
        <button onClick={logout}>
            Выйти
        </button>
    );
};

export default Logout;
