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
        <section className="py-16 bg-gray-50">
        <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <header className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Últimos eventos publicados
            </h2>
            <p className="text-gray-600">
                Los eventos más recientes añadidos a la plataforma
            </p>
            </header>

            {loading ? (
            <p className="text-center text-gray-600">Cargando eventos...</p>
            ) : featuredEvents.length === 0 ? (
            <section className="p-12 text-center bg-white border border-gray-200 rounded-xl">
                <p className="mb-4 text-gray-600">
                Todavía no hay eventos publicados
                </p>
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
                        <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {event.title}
                        </h3>
                    </header>

                    <p className="mb-4 text-gray-600 line-clamp-3">
                        {event.description}
                    </p>

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
    );
    }

    export default FeaturedEventsSection;