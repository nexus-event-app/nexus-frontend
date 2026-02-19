import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';

function Header() {
    const location = useLocation();
    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <nav
                className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
                aria-label="Navegación principal"
            >
                <Link
                    to="/"
                    className="text-xl font-bold text-[#484BCD] hover:text-[#484BCD] sm:text-2xl"
                >
                    Nexus
                </Link>

                <ul className="flex items-center gap-4 list-none sm:gap-6">
                    <li>
                        <Link
                            to="/"
                            className={`text-sm font-medium sm:text-base transition ${
                                location.pathname === '/' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                            }`}
                        >
                            {t('nav.home')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/noticias"
                            className={`text-sm font-medium sm:text-base transition ${
                                location.pathname === '/noticias' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                            }`}
                        >
                            {t('nav.news')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/eventos"
                            className={`text-sm font-medium sm:text-base transition ${
                                location.pathname === '/eventos' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                            }`}
                        >
                            {t('nav.events')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/foro"
                            className={`text-sm font-medium sm:text-base transition ${
                                location.pathname === '/foro' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                            }`}
                        >
                            {t('nav.forum')}
                        </Link>
                    </li>

                    <li>
                        <LanguageSelector />
                    </li>

                    <li>
                        <Link
                            to="/login"
                            className="px-3 py-2 text-xs text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 sm:px-4 sm:text-sm"
                        >
                            Admin
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;