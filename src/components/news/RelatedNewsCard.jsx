import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';


function RelatedNewsCard({ news }) {
    const getCategoryColor = (category) => {
        const colors = {
            FRONTEND: 'bg-blue-100 text-blue-800',
            BACKEND: 'bg-green-100 text-green-800',
            DEVOPS: 'bg-purple-100 text-purple-800',
            CARRERA: 'bg-yellow-100 text-yellow-800',
            RECURSOS: 'bg-pink-100 text-pink-800',
            HERRAMIENTAS: 'bg-indigo-100 text-indigo-800',
            ENTREVISTAS: 'bg-red-100 text-red-800',
            GENERAL: 'bg-gray-100 text-gray-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const getCategoryLabel = (category) => {
        const labels = {
            FRONTEND: 'Frontend',
            BACKEND: 'Backend',
            DEVOPS: 'DevOps',
            CARRERA: 'Carrera',
            RECURSOS: 'Recursos',
            HERRAMIENTAS: 'Herramientas',
            ENTREVISTAS: 'Entrevistas',
            GENERAL: 'General'
        };
        return labels[category] || category;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <article className="overflow-hidden transition bg-white border border-gray-200 rounded-lg hover:shadow-md">
            {news.imageUrl && (
                <figure className="m-0">
                    <img
                        src={getImageUrl(news.imageUrl)}
                        alt={news.title}
                        className="object-cover w-full h-32 sm:h-40"
                    />
                </figure>
            )}


            <section className="p-4">
                <header className="mb-3">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-2 ${getCategoryColor(news.category)}`}>
                        {getCategoryLabel(news.category)}
                    </span>

                    <h3 className="mb-1 text-base font-bold text-gray-900 line-clamp-2 sm:text-lg">
                        {news.title}
                    </h3>

                    <time
                        dateTime={news.createdAt}
                        className="text-xs text-gray-500 sm:text-sm"
                    >
                        {formatDate(news.createdAt)}
                    </time>
                </header>

                <Link
                    to={`/noticias/${news.id}`}
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    aria-label={`Leer más sobre ${news.title}`}
                >
                    Leer más
                    <svg
                        className="w-3 h-3 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </section>
        </article>
    );
}

export default RelatedNewsCard;