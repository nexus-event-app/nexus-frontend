    import React, { useState, useEffect } from 'react';
    import newsService from '../../services/newsService';
    import logoFooter from '../../assets/images/LogoFooter.png';

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
            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {news.map(item => (
                <article
                    key={item.id}
                    className="overflow-hidden transition bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md"
                >
                    {item.imageUrl && (
                    <img
                        src={logoFooter}
                        alt={item.title}
                        className="object-cover w-full h-48"
                    />
                    )}

                    <section className="p-6">
                    <header className="mb-3">
                        <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
                        {item.title}
                        </h3>
                        {item.author && (
                        <p className="text-sm text-gray-500">Por {item.author}</p>
                        )}
                    </header>

                    {item.content && (
                        <p className="mb-4 text-gray-600 line-clamp-3">{item.content}</p>
                    )}

                    {item.sourceUrl && (
                        <footer>
                        <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                        >
                            Leer más →
                        </a>
                        </footer>
                    )}
                    </section>
                </article>
                ))}
            </section>
            )}
        </article>
        </section>
    );
    }

    export default NewsSection;
