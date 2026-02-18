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
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white"
        >
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
                    >
                        Últimos eventos publicados
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600"
                    >
                        Conecta, aprende y crece con la comunidad tech
                    </p>
                </header>

                {loading ? (
                    <p className="text-center text-gray-600">Cargando eventos...</p>
                ) : featuredEvents.length === 0 ? (
                    <section className="relative p-12 overflow-hidden text-center transition-all duration-300 bg-white border-2 border-purple-200 border-dashed rounded-xl hover:bg-[#A3A1F7] hover:shadow-lg">
                        <section className="absolute inset-0 opacity-5 bg-[#A3A1F7]"></section>

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
                                className="inline-flex items-center px-8 py-3 text-base font-semibold text-white transition-all shadow-lg rounded-2xl bg-[#A3A1F7] hover:bg[#3F53A8] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
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
                                    className="flex flex-col h-full p-8 bg-white border border-gray-100 shadow-lg rounded-2xl shadow-gray-200/60"

                                >
                                    <header className="mb-4">
                                        <span className={`inline-block px-4 py-2 mb-4 text-xs font-bold uppercase tracking-wider rounded-full ${event.level === 'JUNIOR_FRIENDLY'
                                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800'
                                                : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                                            }`}>
                                            {event.level === 'JUNIOR_FRIENDLY' ? '✨ Junior Friendly' : '🌟 Todos los niveles'}
                                        </span>

                                        <h3 className="mb-4 text-xl font-bold leading-snug text-gray-900 line-clamp-2"
                                        >
                                            {event.title}
                                        </h3>
                                    </header>

                                    <p className="flex-1 mb-6 text-base leading-7 text-gray-600 line-clamp-3"
                                    >
                                        {event.description}
                                    </p>

                                    <section className="p-4 mb-6 space-y-2 text-sm border border-gray-100 rounded-xl bg-gray-50"
                                    >
                                        <time className="flex items-center gap-2 font-medium text-gray-700"
                                            dateTime={event.eventDate}>
                                            <span className="text-lg">📅</span>
                                            <span>
                                                {new Date(event.eventDate).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </time>
                                        <address className="flex items-center gap-2 not-italic font-medium text-gray-700"
                                        >
                                            <span className="text-lg">📍</span>
                                            <span>{event.location}</span>
                                        </address>
                                    </section>

                                    {event.tags && (
                                        <footer className="pt-4 mt-auto text-center border-t border-gray-100">
                                            <p className="text-xs font-medium tracking-wide text-indigo-600 uppercase"
                                            >
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
                                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white transition-all rounded-xl bg-[#3F53A8] hover:bg-{#A3A1F7} hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-100"
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