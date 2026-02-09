import React from 'react';

function TestimonialCard({ testimonial }) {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getAvatarColor = (name) => {
        const colors = [
            'bg-indigo-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-blue-500',
            'bg-green-500',
            'bg-yellow-500',
            'bg-red-500',
            'bg-teal-500'
        ];
        const index = name.length % colors.length;
        return colors[index];
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
    const avatarColor = getAvatarColor(testimonial.name);

    return (
        <article className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
            <header className="flex items-start gap-4 mb-4">
                <section className={`flex items-center justify-center w-12 h-12 text-white rounded-full ${avatarColor} flex-shrink-0`}>
                    <span className="text-lg font-bold">{initials}</span>
                </section>

                <section className="flex-1">
                    <h3 className="font-bold text-gray-900">
                        {testimonial.name}
                    </h3>
                    {testimonial.role && (
                        <p className="text-sm text-gray-600">
                            {testimonial.role}
                        </p>
                    )}
                    {testimonial.location && (
                        <p className="text-sm text-gray-500">
                            📍 {testimonial.location}
                        </p>
                    )}
                </section>
            </header>

            <p className="mb-4 text-gray-700">
                "{testimonial.content}"
            </p>

            <footer className="flex items-center gap-2 text-xs text-gray-500">
                {testimonial.isHighlighted && (
                    <span className="px-2 py-1 text-yellow-600 rounded-full bg-yellow-50">
                        ⭐ Destacado
                    </span>
                )}
                <span>📅 {getRelativeTime(testimonial.createdAt)}</span>
            </footer>
        </article>
    );
}

export default TestimonialCard;