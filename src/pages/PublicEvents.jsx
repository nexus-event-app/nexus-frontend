import React, { useState, useEffect } from 'react';
import eventService from '../services/eventService';
import EventFilters from '../components/events/EventFilters';
import Layout from '../components/layout/Layout';

function PublicEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('upcoming');

  const [filters, setFilters] = useState({
    location: '',
    eventType: '',
    level: '',
    search: ''
  });

  const hasActiveFilters =
    filters.location || filters.eventType || filters.level || filters.search;

  const displayEvents = hasActiveFilters ? filteredEvents : events;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        let data;
        if (timeFilter === 'upcoming') data = await eventService.getUpcomingEvents();
        else if (timeFilter === 'all') data = await eventService.getAllEvents();
        else if (timeFilter === 'past') data = await eventService.getPastEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [timeFilter]);

  useEffect(() => {
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

      if (filters.location)
        filtered = filtered.filter(event => event.location === filters.location);

      if (filters.eventType)
        filtered = filtered.filter(event => event.eventType === filters.eventType);

      if (filters.level)
        filtered = filtered.filter(event => event.level === filters.level);

      setFilteredEvents(filtered);
    };

    applyFilters();
  }, [events, filters]);

  const handleFilterChange = (filterName, value) =>
    setFilters(prev => ({ ...prev, [filterName]: value }));

  const clearFilters = () =>
    setFilters({ location: '', eventType: '', level: '', search: '' });

  return (
    <Layout>
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

          <section className="flex flex-wrap justify-center gap-3 mb-8">
            {['upcoming', 'all', 'past'].map(filter => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  timeFilter === filter
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filter === 'upcoming'
                  ? 'Próximos eventos'
                  : filter === 'all'
                  ? 'Todos'
                  : 'Eventos pasados'}
              </button>
            ))}
          </section>

          <section className="mb-8">
            <EventFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              showSearch
              resultCount={displayEvents.length}
              totalCount={events.length}
            />
          </section>

          {loading ? (
            <p className="text-center text-gray-600">Cargando eventos...</p>
          ) : displayEvents.length === 0 ? (
            <section className="p-12 text-center bg-white border border-gray-200 rounded-xl">
              <p className="text-xl text-gray-600">
                {hasActiveFilters
                  ? 'No hay eventos que coincidan con tu búsqueda'
                  : 'No hay eventos disponibles en este momento'}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 mt-4 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Ver todos los eventos
                </button>
              )}
            </section>
          ) : (
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayEvents.map(event => (
                <article
                  key={event.id}
                  className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
                >
                  <header className="mb-4">
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-medium text-indigo-600 rounded-full bg-indigo-50">
                      {event.level === 'JUNIOR_FRIENDLY'
                        ? 'Junior Friendly'
                        : 'Todos los niveles'}
                    </span>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{event.title}</h3>
                  </header>

                  <p className="mb-4 text-gray-600 line-clamp-3">{event.description}</p>

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
                      <p className="text-sm text-indigo-600">{event.tags}</p>
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
    </Layout>
  );
}

export default PublicEvents;
