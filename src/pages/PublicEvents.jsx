import React from 'react';
import Layout from '../components/layout/Layout';
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

          <TimeFilterButtons
            timeFilter={timeFilter}
            onFilterChange={setTimeFilter}
          />

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