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
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">

            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900"
                    >Noticias tech para juniors</h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-600"
                    >
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
                                    className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl shadow-gray-200/60 hover:shadow-2xl hover:-translate-y-2"

                                >
                                    {item.imageUrl && (
                                        <figure className="relative h-48 overflow-hidden"
                                        >
                                            <img
                                                src={getImageUrl(item.imageUrl)}
                                                alt={item.title}
                                                className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"

                                            />
                                        </figure>
                                    )}

                                    <section className="flex flex-col flex-1 p-6">
                                        <header className="mb-4">
                                            <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 line-clamp-2"
                                            >
                                                {item.title}
                                            </h3>
                                            {item.author && (
                                                <p className="text-sm text-gray-500"
                                                >
                                                    Por <span className="font-semibold text-gray-700">{item.author}</span>
                                                </p>
                                            )}
                                        </header>

                                        {item.content && (
                                            <p className="flex-1 mb-6 text-base leading-7 text-gray-600 line-clamp-3"
                                            >
                                                {item.content}
                                            </p>
                                        )}

                                        <footer className="pt-4 mt-auto text-center border-t border-gray-100">
                                            <Link
                                                to={`/noticias/${item.id}`}
                                                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#3F53A8] rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500"

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
                                className="inline-flex items-center px-10 py-3 text-lg font-semibold text-white bg-[#3F53A8] rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"

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