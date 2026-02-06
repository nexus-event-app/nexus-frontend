    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function Header() {
    const navigate = useNavigate();

    return (
        <header className="bg-white border-b border-gray-200 shadow-sm">
        <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-indigo-600 transition hover:text-indigo-700"
            >
            Nexus
            </button>
            <menu className="flex items-center gap-6 p-0 m-0 list-none">
            <li>
                <button
                onClick={() => navigate('/')}
                className="font-medium text-gray-700 transition hover:text-indigo-600"
                >
                Inicio
                </button>
            </li>
            <li>
                <button
                onClick={() => navigate('/eventos')}
                className="font-medium text-gray-700 transition hover:text-indigo-600"
                >
                Eventos
                </button>
            </li>
            <li>
                <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                Admin
                </button>
            </li>
            </menu>
        </nav>
        </header>
    );
    }

    export default Header;