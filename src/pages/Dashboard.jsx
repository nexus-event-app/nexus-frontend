import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminHeader from '../components/layout/AdminHeader';
import StatsCards from '../components/dashboard/StatsCards';
import TestimonialStatsCards from '../components/dashboard/TestimonialStatsCards';
import QuickActionsCard from '../components/dashboard/QuickActionsCard';
import EventFilters from '../components/events/EventFilters';
import EventListItem from '../components/dashboard/EventListItem';
import UserInfoCard from '../components/dashboard/UserInfoCard';
import { useDashboardEvents } from '../hooks/useDashboardEvents';
import { useDashboardTestimonials } from '../hooks/useDashboardTestimonials';

function Dashboard() {
    const { user } = useAuth();
     const navigate = useNavigate();

    const {
        events,
        displayEvents,
        upcomingEvents,
        pastEvents,
        loading: eventsLoading,
        filters,
        hasActiveFilters,
        handleFilterChange,
        clearFilters,
        handleDeleteEvent,
        handleEditEvent
    } = useDashboardEvents();

    const {
        totalTestimonials,
        activeTestimonials,
        highlightedTestimonials,
        loading: testimonialsLoading
    } = useDashboardTestimonials();

    return (
        <>
            <AdminHeader />

            <main className="min-h-screen px-4 py-8 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-8">
                <section className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        Bienvenido, {user?.name}
                    </h2>
                    <p className="text-gray-600">
                        Panel de administración de Nexus - Tech Events Platform
                    </p>
                </section>

                <section className="mb-2">
                    <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                        Eventos
                    </h3>
                    <StatsCards
                        totalEvents={events.length}
                        upcomingEvents={upcomingEvents.length}
                        pastEvents={pastEvents.length}
                        loading={eventsLoading}
                    />
                </section>


                <section className="mb-8">
                    <h3 className="mb-3 text-sm font-semibold tracking-wider text-gray-500 uppercase">
                        Testimonios
                    </h3>
                    <TestimonialStatsCards
                        totalTestimonials={totalTestimonials}
                        activeTestimonials={activeTestimonials}
                        highlightedTestimonials={highlightedTestimonials}
                        loading={testimonialsLoading}
                    />
                </section>
                                <article className="p-6 transition bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
                    <span className="block mb-4 text-4xl" aria-hidden="true">💬</span>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                        Gestionar Foro
                    </h3>
                    <p className="mb-4 text-gray-600">
                        Modera discusiones y comentarios
                    </p>
                    <button
                        onClick={() => navigate('/dashboard/discussions')}
                        className="text-indigo-600 transition hover:text-indigo-700"
                    >
                        Ir al foro →
                    </button>
                </article>

                <QuickActionsCard />

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

                    {eventsLoading ? (
                        <p className="text-gray-600">Cargando eventos...</p>
                    ) : displayEvents.length === 0 ? (
                        <p className="text-gray-600">
                            {hasActiveFilters ? 'No hay eventos que coincidan con los filtros.' : 'No hay eventos creados. ¡Crea el primero!'}
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {displayEvents.map(event => (
                                <EventListItem
                                    key={event.id}
                                    event={event}
                                    onEdit={handleEditEvent}
                                    onDelete={handleDeleteEvent}
                                />
                            ))}
                        </ul>
                    )}
                </section>

                <UserInfoCard user={user} />
            </main>
        </>
    );
}

export default Dashboard;