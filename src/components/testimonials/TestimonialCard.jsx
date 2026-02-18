import React, { useState } from 'react';

function TestimonialCard({ testimonial }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowReadMore = testimonial.content.length > 150;

    const getInitials = (name) => {
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarGradient = (name) => {
        const gradients = [
            'from-indigo-500 to-purple-600',
            'from-purple-500 to-pink-600',
            'from-pink-500 to-rose-600',
            'from-blue-500 to-cyan-600',
            'from-green-500 to-emerald-600',
            'from-yellow-500 to-orange-600',
            'from-red-500 to-pink-600',
            'from-teal-500 to-blue-600'
        ];
        return gradients[name.length % gradients.length];
    };

    const getRelativeTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        if (diffInSeconds < 60) return 'Hace unos segundos';
        if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`;
        if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`;
        if (diffInSeconds < 2592000) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <article className="flex flex-col w-full p-6 transition-all duration-300 bg-white border-2 border-gray-200 rounded-2xl">
            <header className="flex items-start gap-4 mb-6">
                <span
                    className={`flex-shrink-0 flex items-center justify-center w-14 h-14 text-white rounded-2xl bg-gradient-to-br ${getAvatarGradient(testimonial.name)} shadow-lg`}
                    aria-hidden="true"
                >
                    <span className="text-lg font-bold">{getInitials(testimonial.name)}</span>
                </span>
                <section className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-gray-900 truncate sm:text-lg">
                        {testimonial.name}
                    </h3>
                    {testimonial.role && (
                        <p className="mt-1 text-sm font-medium text-gray-600 truncate">
                            {testimonial.role}
                        </p>
                    )}
                    {testimonial.location && (
                        <address className="flex items-center gap-1 mt-1 text-xs not-italic text-gray-500 truncate">
                            <span aria-hidden="true">📍</span>
                            <span>{testimonial.location}</span>
                        </address>
                    )}
                </section>
            </header>

            <blockquote className={`min-w-0 mb-2 ${!isExpanded ? 'h-24 overflow-hidden' : ''}`}>
                <p className="text-sm leading-relaxed text-gray-700 break-words sm:text-base">
                    {testimonial.content}
                </p>
            </blockquote>

            <section className="flex items-center h-8 mb-4">
                {shouldShowReadMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus:underline"
                    >
                        {isExpanded ? '← Leer menos' : 'Leer más →'}
                    </button>
                )}
            </section>

            <footer className="flex flex-wrap items-center gap-2 pt-4 mt-auto border-t border-gray-100">
                {testimonial.isHighlighted && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-yellow-800 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200">
                        <span aria-hidden="true">⭐</span>
                        <span>Destacado</span>
                    </span>
                )}
                <time dateTime={testimonial.createdAt} className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <span aria-hidden="true">📅</span>
                    <span>{getRelativeTime(testimonial.createdAt)}</span>
                </time>
            </footer>
        </article>
    );
}

export default TestimonialCard;