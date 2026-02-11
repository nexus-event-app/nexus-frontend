import React from 'react';
import Layout from '../components/layout/Layout';
import SearchBar from '../components/common/SearchBar';
import EventFilters from '../components/events/EventFilters';
import EventCard from '../components/events/EventCard';
import TimeFilterButtons from '../components/events/TimeFilterButtons';
import EmptyEventsState from '../components/events/EmptyEventsState';
import { useEventFilters } from '../hooks/useEventFilters';

function PublicEvents() {
  const {
    displayEvents,
    loading,
    timeFilter,
    setTimeFilter,
    filters,
    hasActiveFilters,
    handleFilterChange,
    clearFilters,
    events
  } = useEventFilters();

  return (
    <Layout>
      <header className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#3E54A3] to-[#3E54A3]/70 mb-6">
        <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Eventos Tech para Juniors
          </h2>
          <p className="text-lg text-indigo-100 sm:text-xl">
            Descubre meetups, talleres y oportunidades de networking en tu ciudad
          </p>
        </article>
      </header>

      <main className="min-h-screen pb-8 bg-gray-50">
        <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <TimeFilterButtons
            timeFilter={timeFilter}
            onFilterChange={setTimeFilter}
          />

          <section className="mb-8">
            <SearchBar
              searchTerm={filters.search || ''}
              onSearchChange={(value) => handleFilterChange('search', value)}
              placeholder="Buscar eventos por título, descripción, tags u organizador..."
              totalResults={displayEvents.length}
            />
          </section>

          <section className="mb-8">
            <EventFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              resultCount={displayEvents.length}
              totalCount={events.length}
            />
          </section>

          {loading ? (
            <p className="text-center text-gray-600">Cargando eventos...</p>
          ) : displayEvents.length === 0 ? (
            <EmptyEventsState
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
            />
          ) : (
            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </section>
          )}
        </section>
      </main>
    </Layout>
  );
}

export default PublicEvents;