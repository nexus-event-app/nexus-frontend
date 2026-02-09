import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminHeader({
    title = 'Nexus Admin',
    showBackButton = false,
    backTo = '/dashboard',
    backLabel = '← Volver al Dashboard'
}) {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-sm">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-indigo-600">
                    {title}
                </h1>

                <menu className="flex items-center gap-4 p-0 m-0 list-none">
                    {showBackButton && (
                        <li>
                            <button
                                onClick={() => navigate(backTo)}
                                className="px-4 py-2 text-sm text-gray-700 transition hover:text-indigo-600"
                            >
                                {backLabel}
                            </button>
                        </li>
                    )}

                    {user && (
                        <>
                            <li className="text-sm text-gray-700">
                                {user.name}
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    )}
                </menu>
            </nav>
        </header>
    );
}

export default AdminHeader;