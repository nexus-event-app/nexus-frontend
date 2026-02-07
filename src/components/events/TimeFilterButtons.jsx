    import React from 'react';

    function TimeFilterButtons({ timeFilter, onFilterChange }) {
    const filters = [
        { value: 'upcoming', label: 'Próximos eventos' },
        { value: 'all', label: 'Todos' },
        { value: 'past', label: 'Eventos pasados' }
    ];

    return (
        <section className="flex flex-wrap justify-center gap-3 mb-8">
        {filters.map(filter => (
            <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-6 py-2 rounded-lg font-medium transition ${
                timeFilter === filter.value
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            >
            {filter.label}
            </button>
        ))}
        </section>
    );
    }

    export default TimeFilterButtons;