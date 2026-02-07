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
        <article className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
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
    );
}

export default EventCard;