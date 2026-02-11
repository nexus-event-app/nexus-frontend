    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import eventService from '../../services/eventService';

    function FeaturedEventsSection() {
    const navigate = useNavigate();
    const [featuredEvents, setFeaturedEvents] = useState([]);
    const [loading, setLoading] = useState(true);

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
        setLoading(false);
        }
    };

    return (
<section className="py-16 bg-gradient-to-br from-gray-50 to-purple-50">
    <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                Últimos eventos publicados
            </h2>
            <p className="text-lg text-gray-600">
                Conecta, aprende y crece con la comunidad tech
            </p>
        </header>

        {loading ? (
            <p className="text-center text-gray-600">Cargando eventos...</p>
        ) : featuredEvents.length === 0 ? (
            <section className="relative p-12 overflow-hidden text-center transition-all duration-300 bg-white border-2 border-purple-200 border-dashed rounded-xl hover:border-purple-400 hover:shadow-lg">
                <section className="absolute inset-0 opacity-5 bg-gradient-to-br from-purple-100 to-pink-100"></section>
                
                <section className="relative z-10">
                    <p className="mb-2 text-6xl">🎯</p>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">
                        Próximamente nuevos eventos
                    </h3>
                    <p className="mb-6 text-gray-600">
                        Estamos preparando eventos increíbles para la comunidad
                    </p>
                    <button
                        onClick={() => navigate('/eventos')}
                        className="inline-flex items-center px-8 py-3 text-base font-semibold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        Explorar eventos
                    </button>
                </section>
            </section>
        ) : (
            <>
                <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                    {featuredEvents.map(event => (
                        <article
                            key={event.id}
                            className="relative flex flex-col h-full p-6 transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl hover:shadow-2xl hover:border-purple-400 hover:-translate-y-1"
                        >
                            <header className="mb-4">
                                <span className={`inline-block px-4 py-2 mb-4 text-xs font-bold uppercase tracking-wider rounded-full ${
                                    event.level === 'JUNIOR_FRIENDLY' 
                                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                                        : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                                }`}>
                                    {event.level === 'JUNIOR_FRIENDLY' ? '✨ Junior Friendly' : '🌟 Todos los niveles'}
                                </span>
                                
                                <h3 className="mb-3 text-xl font-bold text-center text-gray-900 line-clamp-2">
                                    {event.title}
                                </h3>
                            </header>

                            <p className="flex-1 mb-4 text-sm text-center text-gray-600 sm:text-base line-clamp-3">
                                {event.description}
                            </p>

                            <section className="p-4 mb-4 space-y-2 text-sm rounded-lg bg-gradient-to-r from-purple-50 to-pink-50">
                                <time className="flex items-center justify-center gap-2 font-medium text-gray-700" dateTime={event.eventDate}>
                                    <span className="text-lg">📅</span>
                                    <span>
                                        {new Date(event.eventDate).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </time>
                                <address className="flex items-center justify-center gap-2 not-italic font-medium text-gray-700">
                                    <span className="text-lg">📍</span>
                                    <span>{event.location}</span>
                                </address>
                            </section>

                            {event.tags && (
                                <footer className="pt-4 mt-auto text-center border-t border-gray-100">
                                    <p className="text-xs font-semibold text-purple-600">
                                        {event.tags}
                                    </p>
                                </footer>
                            )}
                        </article>
                    ))}
                </section>

                <footer className="text-center">
                    <button
                        onClick={() => navigate('/eventos')}
                        className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                    >
                        Ver todos los eventos →
                    </button>
                </footer>
            </>
        )}
    </article>
</section>
    );
    }

    export default FeaturedEventsSection;