import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../../services/newsService';
import { getImageUrl } from '../../utils/imageUtils';

function NewsSection() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const data = await newsService.getLatestNews();
            setNews(data);
        } catch (error) {
            console.error('Error al cargar noticias:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
<section className="py-16 bg-white">
    <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Noticias tech para juniors</h2>
            <p className="text-gray-600">
                Mantente al día con las últimas novedades del mundo tech
            </p>
        </header>

        {loading ? (
            <p className="text-center text-gray-600">Cargando noticias...</p>
        ) : news.length === 0 ? (
            <section className="p-12 text-center border border-gray-200 bg-gray-50 rounded-xl">
                <p className="text-gray-600">
                    Próximamente añadiremos noticias relevantes para juniors
                </p>
            </section>
        ) : (
            <>
                <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {news.map(item => (
                        <article
                            key={item.id}
                            className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-1"
                        >
                            {item.imageUrl && (
                                <figure className="relative h-48 overflow-hidden">
                                    <img
                                        src={getImageUrl(item.imageUrl)}
                                        alt={item.title}
                                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                    />
                                </figure>
                            )}

                            <section className="flex flex-col flex-1 p-6">
                                <header className="mb-4">
                                    <h3 className="mb-3 text-xl font-bold text-center text-gray-900 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    {item.author && (
                                        <p className="text-sm text-center text-gray-500">
                                            Por <span className="font-semibold text-gray-700">{item.author}</span>
                                        </p>
                                    )}
                                </header>

                                {item.content && (
                                    <p className="flex-1 mb-4 text-sm text-center text-gray-600 sm:text-base line-clamp-3">
                                        {item.content}
                                    </p>
                                )}

                                <footer className="pt-4 mt-auto text-center border-t border-gray-100">
                                    <Link
                                        to={`/noticias/${item.id}`}
                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Leer más →
                                    </Link>
                                </footer>
                            </section>
                        </article>
                    ))}
                </section>

                <footer className="mt-12 text-center">
                    <Link
                        to="/noticias"
                        className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    >
                        Ver todas las noticias
                    </Link>
                </footer>
            </>
        )}
    </article>
</section>
    );
}

export default NewsSection;