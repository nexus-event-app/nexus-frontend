import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';
import EventFilters from '../components/events/EventFilters';

function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        location: '',
        eventType: '',
        level: '',
        search: ''
    });

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [events, filters]);

    const loadEvents = async () => {
        try {
            const [allEvents, upcoming, past] = await Promise.all([
                eventService.getAllEvents(),
                eventService.getUpcomingEvents(),
                eventService.getPastEvents()
            ]);

            setEvents(allEvents);
            setUpcomingEvents(upcoming);
            setPastEvents(past);
        } catch (error) {
            console.error('Error al cargar eventos:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...events];

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchLower) ||
                event.description?.toLowerCase().includes(searchLower) ||
                event.tags?.toLowerCase().includes(searchLower)
            );
        }

        if (filters.location) {
            filtered = filtered.filter(event => event.location === filters.location);
        }

        if (filters.eventType) {
            filtered = filtered.filter(event => event.eventType === filters.eventType);
        }

        if (filters.level) {
            filtered = filtered.filter(event => event.level === filters.level);
        }

        setFilteredEvents(filtered);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            location: '',
            eventType: '',
            level: '',
            search: ''
        });
    };

    const hasActiveFilters = filters.location || filters.eventType || filters.level || filters.search;

    const displayEvents = hasActiveFilters ? filteredEvents : events;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este evento?')) {
            try {
                await eventService.deleteEvent(id);
                loadEvents();
            } catch (error) {
                console.error('Error al eliminar evento:', error);
            }
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
            <header className="bg-white shadow-sm">
                <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-indigo-600">
                        Nexus Admin
                    </h1>

                    <menu className="flex items-center gap-4 p-0 m-0 list-none">
                        <li className="text-gray-700">
                            {user?.name}
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </menu>
                </nav>
            </header>

            <main className="min-h-screen px-4 py-8 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-8">
                <section className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        Bienvenido, {user?.name}
                    </h2>
                    <p className="text-gray-600">
                        Panel de administración de Nexus - Tech Events Platform
                    </p>
                </section>

                <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                    <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h3 className="mb-2 text-sm font-medium text-gray-600">
                            Total Eventos
                        </h3>
                        <p className="text-3xl font-bold text-indigo-600">
                            {loading ? '...' : events.length}
                        </p>
                    </article>

                    <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h3 className="mb-2 text-sm font-medium text-gray-600">
                            Próximos Eventos
                        </h3>
                        <p className="text-3xl font-bold text-green-600">
                            {loading ? '...' : upcomingEvents.length}
                        </p>
                    </article>

                    <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h3 className="mb-2 text-sm font-medium text-gray-600">
                            Eventos Pasados
                        </h3>
                        <p className="text-3xl font-bold text-gray-600">
                            {loading ? '...' : pastEvents.length}
                        </p>
                    </article>
                </section>

                <section className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                        Acciones Rápidas
                    </h2>
                    <menu className="flex gap-4 p-0 m-0 list-none">
                        <li>
                            <button
                                onClick={() => navigate('/events/create')}
                                className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                            >
                                Crear Evento
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Ver Página Pública
                            </button>
                        </li>
                    </menu>
                </section>

                <section className="mb-8">
                    <EventFilters
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearFilters}
                        showSearch={true}
                        resultCount={displayEvents.length}
                        totalCount={events.length}
                    />
                </section>

                <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                        Todos los Eventos
                    </h2>

                    {loading ? (
                        <p className="text-gray-600">Cargando eventos...</p>
                    ) : displayEvents.length === 0 ? (
                        <p className="text-gray-600">
                            {hasActiveFilters ? 'No hay eventos que coincidan con los filtros.' : 'No hay eventos creados. ¡Crea el primero!'}
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {displayEvents.map(event => (
                                <li key={event.id} className="p-4 transition border border-gray-200 rounded-lg hover:bg-gray-50">
                                    <article>
                                        <header className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {event.title}
                                            </h3>
                                            <menu className="flex gap-2 p-0 m-0 list-none">
                                                <li>
                                                    <button
                                                        onClick={() => navigate(`/events/edit/${event.id}`)}
                                                        className="px-3 py-1 text-sm text-indigo-600 transition rounded hover:bg-indigo-50"
                                                    >
                                                        Editar
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={() => handleDeleteEvent(event.id)}
                                                        className="px-3 py-1 text-sm text-red-600 transition rounded hover:bg-red-50"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </li>
                                            </menu>
                                        </header>

                                        <p className="mb-3 text-gray-600">
                                            {event.description}
                                        </p>

                                        <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                                            <dt className="text-gray-500">Fecha:</dt>
                                            <dd className="font-medium">{formatDate(event.eventDate)}</dd>
                                            <dt className="text-gray-500">Ubicación:</dt>
                                            <dd className="font-medium">{event.location}</dd>
                                            <dt className="text-gray-500">Tipo:</dt>
                                            <dd className="font-medium">{event.eventType}</dd>
                                            <dt className="text-gray-500">Nivel:</dt>
                                            <dd className="font-medium">{event.level}</dd>
                                        </dl>

                                        {event.tags && (
                                            <p className="mt-3 text-sm text-indigo-600">
                                                {event.tags}
                                            </p>
                                        )}
                                    </article>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="p-6 mt-8 border border-blue-100 bg-blue-50 rounded-xl">
                    <h2 className="mb-3 text-lg font-bold text-gray-900">
                        Tu Información
                    </h2>
                    <dl className="space-y-2">
                        <dt className="text-sm text-gray-600">Email:</dt>
                        <dd className="font-medium text-gray-900">{user?.email}</dd>
                        <dt className="text-sm text-gray-600">Rol:</dt>
                        <dd className="font-medium text-gray-900">{user?.role}</dd>
                        <dt className="text-sm text-gray-600">Cuenta creada:</dt>
                        <dd className="font-medium text-gray-900">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                        </dd>
                    </dl>
                </section>
            </main>
        </>
    );
}

export default Dashboard;