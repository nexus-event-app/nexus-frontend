import React, { useState } from 'react';

function TestimonialCard({ testimonial }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldShowReadMore = testimonial.content.length > 150;

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
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
        const index = name.length % gradients.length;
        return gradients[index];
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

    const initials = getInitials(testimonial.name);
    const avatarGradient = getAvatarGradient(testimonial.name);

    return (
        <article className="relative flex flex-col h-full p-6 overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 group sm:p-8 rounded-2xl">
            <span className="absolute inset-0 opacity-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50" aria-hidden="true"></span>

            <section className="relative z-10 flex flex-col flex-1">
                <header className="flex items-start gap-4 mb-6">
                    <section className="relative flex-shrink-0">
                        <span
                            className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 text-white rounded-2xl bg-gradient-to-br ${avatarGradient} shadow-lg`}
                        >
                            <span className="text-lg font-bold sm:text-xl">{initials}</span>
                        </span>
                    </section>

                    <section className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate sm:text-xl">
                            {testimonial.name}
                        </h3>
                        {testimonial.role && (
                            <p className="mt-1 text-sm font-medium text-gray-600 truncate sm:text-base">
                                {testimonial.role}
                            </p>
                        )}
                        {testimonial.location && (
                            <address className="flex items-center gap-1 mt-2 text-xs not-italic text-gray-500 truncate sm:text-sm">
                                <span aria-hidden="true">📍</span>
                                <span>{testimonial.location}</span>
                            </address>
                        )}
                    </section>
                </header>

                <blockquote className="relative flex-1 mb-4">
                    <span className="absolute text-6xl text-indigo-100 opacity-50 -top-8 -left-2" aria-hidden="true">"</span>
                    <p className={`relative text-base leading-relaxed text-gray-700 sm:text-lg ${!isExpanded && shouldShowReadMore ? 'line-clamp-4' : ''
                        }`}>
                        {testimonial.content}
                    </p>
                    {!isExpanded && <span className="absolute text-6xl text-indigo-100 opacity-50 -bottom-8 -right-2" aria-hidden="true">"</span>}
                </blockquote>

                {shouldShowReadMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="self-start mb-4 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700 focus:outline-none focus:underline"
                    >
                        {isExpanded ? '← Leer menos' : 'Leer más →'}
                    </button>
                )}

                <footer className="flex flex-wrap items-center gap-2 pt-4 mt-auto border-t border-gray-100">
                    {testimonial.isHighlighted && (
                        <span className="inline-flex flex-row-reverse items-center gap-1 px-3 py-1 text-xs font-semibold text-yellow-800 rounded-full bg-gradient-to-r from-yellow-100 to-yellow-200 sm:text-sm">
                            <span aria-hidden="true">⭐</span>
                        </span>
                    )}
                    <time
                        className="inline-flex items-center gap-1 text-xs text-gray-500 sm:text-sm"
                        dateTime={testimonial.createdAt}
                    >
                        <span aria-hidden="true">📅</span>
                        <span>{getRelativeTime(testimonial.createdAt)}</span>
                    </time>
                </footer>
            </section>
        </article>
    );
}

export default TestimonialCard;