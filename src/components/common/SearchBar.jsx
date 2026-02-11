import React from 'react';

function SearchBar({
    searchTerm,
    onSearchChange,
    placeholder = "Buscar...",
    totalResults = null
}) {
    return (
        <section className="w-full max-w-2xl mx-auto">
            <label htmlFor="search-input" className="sr-only">
                {placeholder}
            </label>

            <section className="relative">
                <svg
                    className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                <input
                    id="search-input"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full py-3 pl-12 pr-4 text-gray-900 transition border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#4C4AD6]/20 focus:border-[#4C4AD6] placeholder:text-gray-400"
                />

                {totalResults !== null && searchTerm && (
                    <span className="absolute px-3 py-1 text-xs font-semibold text-white transform -translate-y-1/2 rounded-full bg-gradient-to-r from-[#4C4AD6] to-purple-600 right-9 top-1/2">
                        {totalResults} {totalResults === 1 ? 'resultado' : 'resultados'}
                    </span>
                )}

                {searchTerm && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute text-gray-400 transition transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-600"
                        aria-label="Limpiar búsqueda"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </section>

            {searchTerm && totalResults !== null && (
                <p className="mt-2 text-sm text-center text-gray-600">
                    {totalResults === 0
                        ? `No se encontraron resultados para "${searchTerm}"`
                        : `Mostrando resultados para "${searchTerm}"`
                    }
                </p>
            )}
        </section>
    );
}

export default SearchBar;