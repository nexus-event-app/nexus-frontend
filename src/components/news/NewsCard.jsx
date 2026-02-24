import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtils';
import { getCategoryColor, getCategoryLabel } from '../constants/newsCategories';

function NewsCard({ news }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <article className="overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl shadow-gray-200/60">
            {news.imageUrl && (
                <figure className="m-0">
                    <img
                        src={getImageUrl(news.imageUrl)}
                        alt={news.title}
                        className="object-cover w-full h-32 sm:h-60 md:h-32"
                    />
                </figure>
            )}

            <section className="p-4 sm:p-6">
                <header className="mb-4">
                    <nav className="flex flex-wrap items-center gap-2 mb-3" aria-label="Metadatos de la noticia">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(news.category)}`}>
                            {getCategoryLabel(news.category)}
                        </span>
                        <time dateTime={news.createdAt} className="text-sm text-gray-500">
                            {formatDate(news.createdAt)}
                        </time>
                    </nav>

                    <h2 className="mb-2 text-lg font-bold leading-snug text-gray-900 line-clamp-2">
                        {news.title}
                    </h2>
                </header>

                {news.content && (
                    <p className="mb-6 text-base leading-7 text-gray-600 line-clamp-3">
                        {news.content}
                    </p>
                )}

                <footer>
                    {news.author && (
                        <p className="mb-4 text-sm text-gray-500">
                            Por <span className="font-medium text-gray-700">{news.author}</span>
                        </p>
                    )}

                    <Link
                        to={`/noticias/${news.id}`}
                        className="inline-flex items-center text-sm font-semibold text-indigo-600 sm:text-base"
                        aria-label={`Leer más sobre ${news.title}`}
                    >
                        Leer más
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </footer>
            </section>
        </article>
    );
}

export default NewsCard;