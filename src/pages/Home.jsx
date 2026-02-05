    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function Home() {
    const navigate = useNavigate();

    return (
        <>
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-indigo-600">Nexus</h1>

            <menu className="flex items-center gap-6 p-0 m-0 list-none">
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

        <main className="min-h-screen bg-gray-50">
            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
            <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
                <h2 className="mb-6 text-5xl font-bold text-white">
                Conectando juniors con oportunidades tech
                </h2>
                <p className="mb-8 text-xl text-indigo-100">
                No estás solo en tu búsqueda. Nexus reúne eventos, recursos y una comunidad de developers junior que entienden tu camino.
                </p>

                <menu className="flex justify-center gap-4 p-0 m-0 list-none">
                <li>
                    <button
                    onClick={() => navigate('/eventos')}
                    className="px-8 py-3 text-lg font-medium text-indigo-600 transition bg-white rounded-lg hover:bg-gray-50"
                    >
                    Explorar eventos
                    </button>
                </li>
                <li>
                    <a
                    href="#testimonios"
                    className="px-8 py-3 text-lg font-medium text-white transition border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600"
                    >
                    Conoce historias
                    </a>
                </li>
                </menu>
            </article>
            </section>

        </main>

        <footer className="py-8 text-center bg-white border-t border-gray-200">
            <p className="text-gray-600">
            Nexus - Plataforma de eventos tech para juniors
            </p>
            <p className="mt-2 text-sm text-gray-500">
            Conectando la comunidad tech junior en España
            </p>
        </footer>
        </>
    );
    }

    export default Home;
