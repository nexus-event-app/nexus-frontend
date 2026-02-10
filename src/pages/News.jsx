import React from 'react';
import { useNews } from '../hooks/useNews';
import Layout from '../components/layout/Layout';
import NewsCard from '../components/news/NewsCard';
import CategoryFilter from '../components/news/CategoryFilter';
import SearchBar from '../components/news/SearchBar';
import Pagination from '../components/common/Pagination';

function News() {
    const {
        news,
        loading,
        selectedCategory,
        searchTerm,
        currentPage,
        totalPages,
        totalResults,
        hasActiveFilters,
        handleCategoryChange,
        handleSearchChange,
        handlePageChange,
        clearFilters
    } = useNews();

    if (loading) {
        return (
            <Layout>
                <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
                    <section className="flex items-center justify-center min-h-screen" aria-live="polite">
                        <p className="text-lg text-gray-600">Cargando noticias...</p>
                    </section>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <header className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#3E54A3] to-[#3E54A3]/70 mb-6">
                <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                        Noticias y Recursos Tech
                    </h2>
                    <p className="text-lg text-indigo-100 sm:text-xl">
                        Mantente actualizado con las últimas noticias y recursos para juniors
                    </p>
                </article>
            </header>

            <main className="container px-4 pb-8 mx-auto sm:px-6 lg:px-8">
                <section className="mb-8" aria-label="Filtros de búsqueda">
                    <CategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </section>

                <section className="mb-8">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        totalResults={totalResults}
                        hasActiveFilters={hasActiveFilters}
                        onClearFilters={clearFilters}
                    />
                </section>

                {news.length === 0 ? (
                    <section className="py-16 text-center" aria-live="polite">
                        <p className="mb-4 text-xl text-gray-600">
                            No se encontraron noticias
                        </p>
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </section>
                ) : (
                    <>
                        <section
                            className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            aria-label="Lista de noticias"
                        >
                            {news.map(item => (
                                <NewsCard key={item.id} news={item} />
                            ))}
                        </section>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </main>
        </Layout>
    );
}

export default News;