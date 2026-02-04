    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import eventService from '../services/eventService';

    function PublicEvents() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('upcoming');

    useEffect(() => {
        loadEvents();
    }, [filter]);

    const loadEvents = async () => {
        setLoading(true);
        try {
        let data;
        if (filter === 'upcoming') {
            data = await eventService.getUpcomingEvents();
        } else if (filter === 'all') {
            data = await eventService.getAllEvents();
        } else if (filter === 'past') {
            data = await eventService.getPastEvents();
        }
        setEvents(data);
        } catch (error) {
        console.error('Error al cargar eventos:', error);
        } finally {
        setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
    };

    return (
        <>
        <header className="bg-white border-b border-gray-200 shadow-sm">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-indigo-600">
                Nexus
            </h1>
            <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
            >
                Admin Login
            </button>
            </nav>
        </header>

        <main className="min-h-screen py-8 bg-gray-50">
            <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <header className="mb-8 text-center">
                <h2 className="mb-3 text-4xl font-bold text-gray-900">
                Eventos Tech para Juniors
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-gray-600">
                Descubre eventos de networking, workshops y charlas diseñados para developers junior en España
                </p>
            </header>

            <section className="flex justify-center gap-4 mb-8">
                <button
                onClick={() => setFilter('upcoming')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                    filter === 'upcoming'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                >
                Próximos eventos
                </button>
                <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                    filter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                >
                Todos
                </button>
                <button
                onClick={() => setFilter('past')}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                    filter === 'past'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                >
                Eventos pasados
                </button>
            </section>

            {loading ? (
                <p className="text-center text-gray-600">Cargando eventos...</p>
            ) : events.length === 0 ? (
                <section className="p-12 text-center bg-white border border-gray-200 rounded-xl">
                <p className="text-xl text-gray-600">
                    No hay eventos disponibles en este momento
                </p>
                </section>
            ) : (
                <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
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
                        {formatDate(event.eventDate)}
                        </dd>

                        <dd className="flex items-center text-gray-600">
                        <span className="mr-2">📍</span>
                        {event.location}
                        </dd>

                        <dd className="flex items-center text-gray-600">
                        <span className="mr-2">🎯</span>
                        {event.eventType}
                        </dd>
                    </dl>

                    {event.tags && (
                        <footer className="pt-4 mt-4 border-t border-gray-100">
                        <p className="text-sm text-indigo-600">
                            {event.tags}
                        </p>
                        </footer>
                    )}

                    {event.sourceUrl && (
                        <footer className="mt-4">
                        <a
                            href={event.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-full px-4 py-2 text-sm font-medium text-center text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        >
                            Ver más información →
                        </a>
                        </footer>
                    )}
                    </article>
                ))}
                </section>
            )}
            </section>
        </main>

        <footer className="py-8 mt-16 text-center bg-white border-t border-gray-200">
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

    export default PublicEvents;
