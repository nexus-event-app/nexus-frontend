import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNewsDetail } from '../hooks/useNewsDetail';
import Layout from '../components/layout/Layout';
import RelatedNewsCard from '../components/news/RelatedNewsCard';
import { getImageUrl } from '../utils/imageUtils';




function NewsDetail() {
    const { id } = useParams();
    const { news, relatedNews, loading, error, handleBack } = useNewsDetail(id);

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

    if (loading) {
        return (
            <Layout>
                <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
                    <section className="flex items-center justify-center min-h-screen" aria-live="polite">
                        <p className="text-lg text-gray-600">Cargando noticia...</p>
                    </section>
                </main>
            </Layout>
        );
    }

    if (error || !news) {
        return (
            <Layout>
                <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
                    <section className="py-16 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Noticia no encontrada
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Lo sentimos, no pudimos encontrar la noticia que buscas.
                        </p>
                        <button
                            onClick={handleBack}
                            className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Volver a noticias
                        </button>
                    </section>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="container max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <nav aria-label="Navegación" className="mb-6">
                    <ol className="flex flex-wrap items-center gap-2 p-0 m-0 text-sm text-gray-600 list-none">
                        <li>
                            <Link
                                to="/"
                                className="rounded hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Inicio
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li>
                            <Link
                                to="/noticias"
                                className="rounded hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Noticias
                            </Link>
                        </li>
                        <li aria-hidden="true">/</li>
                        <li aria-current="page" className="font-medium text-gray-900">
                            {news.title}
                        </li>
                    </ol>
                </nav>

                <button
                    onClick={handleBack}
                    className="inline-flex items-center mb-6 text-sm font-medium text-indigo-600 rounded hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
                    aria-label="Volver a la lista de noticias"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a noticias
                </button>

                <article className="mb-12">
                    <header className="mb-6">
                        <nav className="flex flex-wrap items-center gap-3 mb-4" aria-label="Metadatos de la noticia">
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(news.category)}`}>
                                {getCategoryLabel(news.category)}
                            </span>
                            <time
                                dateTime={news.createdAt}
                                className="text-sm text-gray-600 sm:text-base"
                            >
                                {formatDate(news.createdAt)}
                            </time>
                        </nav>

                        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                            {news.title}
                        </h1>

                        {news.author && (
                            <p className="text-base text-gray-600 sm:text-lg">
                                Por <span className="font-medium">{news.author}</span>
                            </p>
                        )}
                    </header>

                    {news.imageUrl && (
                        <figure className="mb-8">
                            <img
                                src={getImageUrl(news.imageUrl)}
                                alt={news.title}
                                className="object-cover w-full h-64 rounded-lg sm:h-96"
                            />
                        </figure>
                    )}

                    <section className="prose prose-lg max-w-none">
                        <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap sm:text-lg">
                            {news.content}
                        </p>
                    </section>

                    {news.sourceUrl && (
                        <footer className="pt-6 mt-8 border-t border-gray-200">
                            <p className="text-sm text-gray-600 sm:text-base">
                                Fuente:{' '}
                                <a
                                    href={news.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-indigo-600 rounded hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {news.sourceUrl}
                                </a>
                            </p>
                        </footer>
                    )}
                </article>

                {relatedNews.length > 0 && (
                    <section aria-labelledby="related-news-heading">
                        <h2
                            id="related-news-heading"
                            className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl"
                        >
                            Noticias relacionadas
                        </h2>
                        <ul className="grid grid-cols-1 gap-6 p-0 m-0 list-none sm:grid-cols-2 lg:grid-cols-3">
                            {relatedNews.map(item => (
                                <li key={item.id}>
                                    <RelatedNewsCard news={item} />
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
        </Layout>
    );
}

export default NewsDetail;