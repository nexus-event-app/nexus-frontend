import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <nav
                className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
                aria-label="Navegación principal"
            >
                <Link
                    to="/"
                    className="text-xl font-bold text-indigo-600 transition hover:text-indigo-700 sm:text-2xl"
                >
                    Nexus
                </Link>

                <menu className="flex items-center gap-4 p-0 m-0 list-none sm:gap-6">
                    <li>
                        <Link
                            to="/"
                            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600 sm:text-base"
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/eventos"
                            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600 sm:text-base"
                        >
                            Eventos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/noticias"
                            className="text-sm font-medium text-gray-700 transition hover:text-indigo-600 sm:text-base"
                        >
                            Noticias
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="px-3 py-2 text-xs text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 sm:px-4 sm:text-sm"
                        >
                            Admin
                        </Link>
                    </li>
                </menu>
            </nav>
        </header>
    );
}

export default Header;