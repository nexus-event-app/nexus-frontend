import React from 'react';

function DiscussionCategoryFilter({ selectedCategory, onCategoryChange }) {
    const categories = [
        { value: 'TODAS', label: 'Todas', color: 'bg-gray-600 hover:bg-gray-700' },
        { value: 'AYUDA_TECNICA', label: 'Ayuda Técnica', color: 'bg-blue-600 hover:bg-blue-700' },
        { value: 'RECURSOS', label: 'Recursos', color: 'bg-green-600 hover:bg-green-700' },
        { value: 'EXPERIENCIAS', label: 'Experiencias', color: 'bg-purple-600 hover:bg-purple-700' },
        { value: 'NETWORKING', label: 'Networking', color: 'bg-pink-600 hover:bg-pink-700' },
        { value: 'GENERAL', label: 'General', color: 'bg-gray-600 hover:bg-gray-700' }
    ];

    return (
        <nav aria-label="Filtrar discusiones por categoría" className="text-center">
            <ul className="flex flex-wrap justify-center gap-2 p-0 m-0 mt-6 list-none">
                {categories.map(category => (
                    <li key={category.value}>
                        <button
                            onClick={() => onCategoryChange(category.value)}
                            className={`w-32 px-3 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition ${selectedCategory === category.value
                                    ? `${category.color} ring-2 ring-offset-2 ring-gray-400`
                                    : `${category.color} opacity-70`
                                }`}
                            aria-pressed={selectedCategory === category.value}
                            aria-label={`Filtrar por categoría ${category.label}`}
                        >
                            {category.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default DiscussionCategoryFilter;