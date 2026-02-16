import React from 'react';

function EventCard({ event }) {
    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    return (
        <article className="p-8 bg-white border border-gray-100 shadow-lg rounded-2xl shadow-gray-200/60"
        >
            <header className="mb-4">
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wide text-indigo-700 uppercase bg-indigo-50 border border-indigo-200 rounded-full"
                >
                    {event.level === 'JUNIOR_FRIENDLY' ? 'Junior Friendly' : 'Todos los niveles'}
                </span>
                <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900"
                >
                    {event.title}
                </h3>
            </header>

            <p className="mb-6 text-base leading-7 text-gray-600 line-clamp-3"
            >
                {event.description}
            </p>

            <dl className="space-y-3 text-sm">
                <dd className="flex items-start gap-2 text-gray-600">
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
                <footer className="pt-4 mt-4 text-center border-t border-gray-100">
                    <p className="text-xs font-medium tracking-wide text-indigo-600 uppercase"
                    >{event.tags}</p>
                </footer>
            )}

            {event.sourceUrl && (
                <footer className="mt-4">
                    <a
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full px-5 py-2.5 text-sm font-semibold text-center text-white bg-indigo-600 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"

                    >
                        Ver más información →
                    </a>
                </footer>
            )}
        </article>
    );
}

export default EventCard;