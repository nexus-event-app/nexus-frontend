import React from 'react';

function SearchBar({ searchTerm, onSearchChange, totalResults, hasActiveFilters, onClearFilters }) {
    return (
        <section className="space-y-3" aria-label="Buscar noticias">
            <label htmlFor="search-news" className="block text-sm font-medium text-gray-700 sm:text-base">
                Buscar noticias:
            </label>

            <input
                type="search"
                id="search-news"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Buscar por título o contenido..."
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                aria-label="Buscar noticias por título o contenido"
            />

            <aside className="flex flex-wrap items-center gap-3 text-sm text-gray-600 sm:text-base" aria-live="polite">
                <p>
                    <strong>{totalResults}</strong> {totalResults === 1 ? 'noticia encontrada' : 'noticias encontradas'}
                </p>

                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="font-medium text-indigo-600 underline rounded hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        aria-label="Limpiar todos los filtros de búsqueda"
                    >
                        Limpiar filtros
                    </button>
                )}
            </aside>
        </section>
    );
}

export default SearchBar;