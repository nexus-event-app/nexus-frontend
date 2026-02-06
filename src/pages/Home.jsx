    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import Layout from '../components/layout/Layout';
    import eventService from '../services/eventService';

    function Home() {
    const navigate = useNavigate();
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [loadingEvents, setLoadingEvents] = useState(true);

    useEffect(() => {
        loadFeaturedEvents();
    }, []);

    const loadFeaturedEvents = async () => {
        try {
        const events = await eventService.getLatestEvents();
        setFeaturedEvents(events);
        } catch (error) {
        console.error('Error al cargar eventos destacados:', error);
        } finally {
        setLoadingEvents(false);
        }
    };

    return (
        <Layout>
        <main className="min-h-screen bg-gray-50">
            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
            <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
                <h2 className="mb-6 text-5xl font-bold text-white">
                Conectando juniors con oportunidades tech
                </h2>
                <p className="mb-8 text-xl text-indigo-100">
                No estás solo en tu búsqueda. Nexus reúne eventos, recursos y una comunidad de developers junior que entienden tu camino.
                </p>
                <ul className="flex justify-center gap-4 p-0 m-0 list-none">
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
                </ul>
            </article>
            </section>

            <section className="py-16 bg-white">
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">¿Por qué Nexus?</h2>
                <p className="text-lg text-gray-600">
                    Sabemos lo difícil que es empezar. Por eso creamos un espacio donde los juniors son protagonistas.
                </p>
                </header>
                <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <article className="p-6 text-center">
                    <span className="block mb-4 text-5xl">🎯</span>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">Eventos curados</h3>
                    <p className="text-gray-600">
                    Solo eventos realmente útiles para juniors: networking, workshops y charlas sin requisitos inalcanzables.
                    </p>
                </article>
                <article className="p-6 text-center">
                    <span className="block mb-4 text-5xl">🤝</span>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">Comunidad real</h3>
                    <p className="text-gray-600">
                    Conecta con otros juniors que están en tu misma situación. Comparte dudas, logros y experiencias.
                    </p>
                </article>
                <article className="p-6 text-center">
                    <span className="block mb-4 text-5xl">📚</span>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">Recursos útiles</h3>
                    <p className="text-gray-600">
                    Noticias tech relevantes, guías y consejos pensados específicamente para developers que empiezan.
                    </p>
                </article>
                </section>
            </article>
            </section>

            <section className="py-16 bg-gray-50">
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Últimos eventos publicados</h2>
                <p className="text-gray-600">Los eventos más recientes añadidos a la plataforma</p>
                </header>

                {loadingEvents ? (
                <p className="text-center text-gray-600">Cargando eventos...</p>
                ) : featuredEvents.length === 0 ? (
                <section className="p-12 text-center bg-white border border-gray-200 rounded-xl">
                    <p className="mb-4 text-gray-600">Todavía no hay eventos publicados</p>
                    <button
                    onClick={() => navigate('/eventos')}
                    className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                    Ver todos los eventos
                    </button>
                </section>
                ) : (
                <>
                    <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                    {featuredEvents.map(event => (
                        <article
                        key={event.id}
                        className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
                        >
                        <header className="mb-4">
                            <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-indigo-600 rounded-full bg-indigo-50">
                            {event.level === 'JUNIOR_FRIENDLY' ? 'Junior Friendly' : 'Todos los niveles'}
                            </span>
                            <h3 className="mb-2 text-xl font-bold text-gray-900">{event.title}</h3>
                        </header>

                        <p className="mb-4 text-gray-600 line-clamp-3">{event.description}</p>

                        <dl className="space-y-2 text-sm">
                            <dd className="flex items-center text-gray-600">
                            <span className="mr-2">📅</span>
                            {new Date(event.eventDate).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                            </dd>
                            <dd className="flex items-center text-gray-600">
                            <span className="mr-2">📍</span>
                            {event.location}
                            </dd>
                        </dl>

                        {event.tags && (
                            <footer className="pt-4 mt-4 border-t border-gray-100">
                            <p className="text-sm text-indigo-600">{event.tags}</p>
                            </footer>
                        )}
                        </article>
                    ))}
                    </section>

                    <footer className="text-center">
                    <button
                        onClick={() => navigate('/eventos')}
                        className="px-8 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                        Ver todos los eventos →
                    </button>
                    </footer>
                </>
                )}
            </article>
            </section>

            <section id="testimonios" className="py-16 bg-white">
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900">Historias de la comunidad</h2>
                <p className="text-gray-600">Juniors como tú comparten sus experiencias</p>
                </header>
                <section className="p-12 text-center border border-gray-200 bg-gray-50 rounded-xl">
                <p className="text-gray-600">Testimonios de la comunidad - próximamente</p>
                </section>
            </article>
            </section>

            <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
            <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
                <h2 className="mb-6 text-4xl font-bold text-white">¿Listo para dar el siguiente paso?</h2>
                <p className="mb-8 text-xl text-indigo-100">
                Únete a cientos de juniors que ya están conectando y creciendo en la comunidad tech
                </p>
                <button
                onClick={() => navigate('/eventos')}
                className="px-8 py-4 text-lg font-medium text-indigo-600 transition bg-white rounded-lg hover:bg-gray-50"
                >
                Explorar todos los eventos →
                </button>
            </article>
            </section>
        </main>
        </Layout>
    );
    }

    export default Home;
