    import React from 'react';

    function EventFilters({ 
    filters, 
    onFilterChange, 
    onClearFilters, 
    showSearch = false,
    resultCount = null,
    totalCount = null
    }) {
    const hasActiveFilters = filters.location || filters.eventType || filters.level || (showSearch && filters.search);

    return (
        <section className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
        <header className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">
            {showSearch ? 'Buscar y filtrar eventos' : 'Filtros'}
            </h3>
            {showSearch && (
            <p className="text-sm text-gray-600">
                Encuentra eventos que se adapten a tus necesidades
            </p>
            )}
        </header>

        <section className="space-y-4">
            {showSearch && (
            <label className="block">
                <span className="sr-only">Buscar eventos</span>
                <input
                type="text"
                placeholder="Buscar por título, descripción o etiquetas..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange('search', e.target.value)}
                className="w-full px-4 py-3 text-sm transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
            </label>
            )}

            <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">
                Ubicación
                </span>
                <select
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
                className="w-full px-3 py-2 text-sm transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                <option value="">Todas</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Madrid">Madrid</option>
                <option value="Valencia">Valencia</option>
                <option value="Sevilla">Sevilla</option>
                <option value="Online">Online</option>
                <option value="España">España</option>
                </select>
            </label>

            <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">
                Tipo de evento
                </span>
                <select
                value={filters.eventType}
                onChange={(e) => onFilterChange('eventType', e.target.value)}
                className="w-full px-3 py-2 text-sm transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                <option value="">Todos</option>
                <option value="NETWORKING">Networking</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="TALK">Charla</option>
                <option value="COFFEE_CHAT">Coffee Chat</option>
                </select>
            </label>

            <label className="block">
                <span className="block mb-1 text-sm font-medium text-gray-700">
                Nivel
                </span>
                <select
                value={filters.level}
                onChange={(e) => onFilterChange('level', e.target.value)}
                className="w-full px-3 py-2 text-sm transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                <option value="">Todos</option>
                <option value="JUNIOR_FRIENDLY">Junior Friendly</option>
                <option value="ALL_LEVELS">Todos los niveles</option>
                </select>
            </label>

            <button
                onClick={onClearFilters}
                disabled={!hasActiveFilters}
                className="self-end px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Limpiar filtros
            </button>
            </section>

            {hasActiveFilters && resultCount !== null && totalCount !== null && (
            <p className="text-sm text-gray-600">
                Mostrando {resultCount} de {totalCount} eventos
            </p>
            )}
        </section>
        </section>
    );
    }

    export default EventFilters;