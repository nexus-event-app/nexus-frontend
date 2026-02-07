import React from 'react';

function StatsCards({ totalEvents, upcomingEvents, pastEvents, loading }) {
    return (
        <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                    Total Eventos
                </h3>
                <p className="text-3xl font-bold text-indigo-600">
                    {loading ? '...' : totalEvents}
                </p>
            </article>

            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                    Próximos Eventos
                </h3>
                <p className="text-3xl font-bold text-green-600">
                    {loading ? '...' : upcomingEvents}
                </p>
            </article>

            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                    Eventos Pasados
                </h3>
                <p className="text-3xl font-bold text-gray-600">
                    {loading ? '...' : pastEvents}
                </p>
            </article>
        </section>
    );
}

export default StatsCards;