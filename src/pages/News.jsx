import React from 'react';
import { useNews } from '../hooks/useNews';
import NewsCard from '../components/news/NewsCard';
import CategoryFilter from '../components/news/CategoryFilter';
import SearchBar from '../components/news/SearchBar';
import Pagination from '../components/news/Pagination';

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
            <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <section className="flex items-center justify-center min-h-screen" aria-live="polite">
                    <p className="text-lg text-gray-600">Cargando noticias...</p>
                </section>
            </main>
        );
    }

    return (
        <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
            <header className="mb-8">
                <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                    Noticias y Recursos
                </h1>
                <p className="text-base text-gray-600 sm:text-lg">
                    Mantente actualizado con las últimas noticias y recursos para juniors
                </p>
            </header>

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
    );
}

export default News;