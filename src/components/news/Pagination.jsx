import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5;

        if (totalPages <= showMax) {
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
        <nav aria-label="Paginación de noticias" className="flex justify-center mt-8">
            <ul className="flex flex-wrap items-center gap-2 p-0 m-0 list-none">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Página anterior"
                    >
                        Anterior
                    </button>
                </li>

                {getPageNumbers().map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <span className="px-2 text-gray-500" aria-hidden="true">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 ${currentPage === page
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    }`}
                                aria-label={`Ir a página ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-700 transition bg-white border border-gray-300 rounded-lg sm:px-4 sm:py-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        aria-label="Página siguiente"
                    >
                        Siguiente
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;