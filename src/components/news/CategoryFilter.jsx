import React from 'react';

function CategoryFilter({ selectedCategory, onCategoryChange }) {
    const categories = [
        { value: 'TODAS', label: 'Todas', color: 'bg-gray-600 hover:bg-gray-700' },
        { value: 'FRONTEND', label: 'Frontend', color: 'bg-blue-600 hover:bg-blue-700' },
        { value: 'BACKEND', label: 'Backend', color: 'bg-green-600 hover:bg-green-700' },
        { value: 'DEVOPS', label: 'DevOps', color: 'bg-purple-600 hover:bg-purple-700' },
        { value: 'CARRERA', label: 'Carrera', color: 'bg-yellow-600 hover:bg-yellow-700' },
        { value: 'RECURSOS', label: 'Recursos', color: 'bg-pink-600 hover:bg-pink-700' },
        { value: 'HERRAMIENTAS', label: 'Herramientas', color: 'bg-indigo-600 hover:bg-indigo-700' },
        { value: 'ENTREVISTAS', label: 'Entrevistas', color: 'bg-red-600 hover:bg-red-700' },
        { value: 'GENERAL', label: 'General', color: 'bg-gray-600 hover:bg-gray-700' }
    ];

    return (
        <nav aria-label="Filtrar noticias por categoría">
            <p className="mb-3 text-sm font-medium text-gray-700 sm:text-base">
                Filtrar por categoría:
            </p>
            <ul className="flex flex-wrap gap-2 p-0 m-0 list-none">
                {categories.map(category => (
                    <li key={category.value}>
                        <button
                            onClick={() => onCategoryChange(category.value)}
                            className={`px-3 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition ${selectedCategory === category.value
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

export default CategoryFilter;