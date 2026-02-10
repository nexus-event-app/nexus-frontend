    import React from 'react';

    function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }
        }

        return pages;
    };

    return (
        <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Paginación">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Página anterior"
        >
            ← Anterior
        </button>

        <section className="flex gap-1">
            {getPageNumbers().map((page, index) => (
            page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                ...
                </span>
            ) : (
                <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                    currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                aria-label={`Página ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
                >
                {page}
                </button>
            )
            ))}
        </section>

        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Página siguiente"
        >
            Siguiente →
        </button>
        </nav>
    );
    }

    export default Pagination;