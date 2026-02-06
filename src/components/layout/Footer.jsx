    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function Footer() {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 bg-white border-t border-gray-200">
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <section className="grid grid-cols-1 gap-8 md:grid-cols-4">
            
            <article>
                <h3 className="mb-3 text-xl font-bold text-indigo-600">
                Nexus
                </h3>
                <p className="text-sm text-gray-600">
                Conectando la comunidad tech junior en España. Eventos, recursos y apoyo para developers que empiezan.
                </p>
            </article>

            <article>
                <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase">
                Navega
                </h3>
                <ul className="space-y-2">
                <li>
                    <button
                    onClick={() => navigate('/')}
                    className="text-gray-600 transition hover:text-indigo-600"
                    >
                    Inicio
                    </button>
                </li>
                <li>
                    <button
                    onClick={() => navigate('/eventos')}
                    className="text-gray-600 transition hover:text-indigo-600"
                    >
                    Eventos
                    </button>
                </li>
                <li>
                    <button
                    onClick={() => navigate('/login')}
                    className="text-gray-600 transition hover:text-indigo-600"
                    >
                    Admin
                    </button>
                </li>
                </ul>
            </article>

            <article>
                <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase">
                Comunidad
                </h3>
                <ul className="space-y-2">
                <li>
                    <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition hover:text-indigo-600"
                    >
                    GitHub
                    </a>
                </li>
                <li>
                    <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition hover:text-indigo-600"
                    >
                    LinkedIn
                    </a>
                </li>
                <li>
                    <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition hover:text-indigo-600"
                    >
                    Twitter
                    </a>
                </li>
                </ul>
            </article>

            <article>
                <h3 className="mb-4 text-sm font-bold tracking-wider text-gray-900 uppercase">
                Sobre Nexus
                </h3>
                <p className="text-sm text-gray-600">
                Creado por y para juniors. Una plataforma sin ánimo de lucro para ayudar a developers que empiezan su carrera tech.
                </p>
            </article>
            </section>

            <section className="pt-8 mt-8 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600">
                © {currentYear} Nexus. Hecho para la comunidad tech junior.
            </p>
            </section>
        </section>
        </footer>
    );
    }

    export default Footer;
