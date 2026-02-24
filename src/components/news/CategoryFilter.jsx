import React from 'react';
import { getCategoriesForFilter } from '../constants/newsCategories';

function CategoryFilter({ selectedCategory, onCategoryChange }) {
    const categories = getCategoriesForFilter();

    return (
        <nav aria-label="Filtrar noticias por categoría" className="text-center">
            <ul className="flex flex-wrap justify-center gap-2 p-0 m-0 list-none">
                {categories.map(category => (
                    <li key={category.value}>
                        <button
                            onClick={() => onCategoryChange(category.value)}
                            className={`w-32 px-3 py-2 text-xs sm:text-sm font-medium text-white rounded-lg transition ${
                                selectedCategory === category.value
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