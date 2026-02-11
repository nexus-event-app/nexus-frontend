import React from 'react';

function EventFilters({
    filters,
    onFilterChange,
    onClearFilters,
    resultCount = null,
    totalCount = null
}) {
    const hasActiveFilters = filters.location || filters.eventType || filters.level;

    return (
        <section className="p-6 bg-white border-2 border-gray-200 shadow-sm rounded-xl">
            <header className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                    Filtros
                </h3>
                <p className="text-sm text-gray-600">
                    Refina tu búsqueda de eventos
                </p>
            </header>

            <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <label className="block">
                    <span className="block mb-1 text-sm font-medium text-gray-700">
                        Ubicación
                    </span>
                    <select
                        value={filters.location}
                        onChange={(e) => onFilterChange('location', e.target.value)}
                        className="w-full px-3 py-2 text-sm transition border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4C4AD6]/20 focus:border-[#4C4AD6]"
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
                        className="w-full px-3 py-2 text-sm transition border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4C4AD6]/20 focus:border-[#4C4AD6]"
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
                        className="w-full px-3 py-2 text-sm transition border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-[#4C4AD6]/20 focus:border-[#4C4AD6]"
                    >
                        <option value="">Todos</option>
                        <option value="JUNIOR_FRIENDLY">Junior Friendly</option>
                        <option value="ALL_LEVELS">Todos los niveles</option>
                    </select>
                </label>

                <button
                    onClick={onClearFilters}
                    disabled={!hasActiveFilters}
                    className="self-end px-4 py-2 text-sm font-semibold text-white transition rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                    Limpiar filtros
                </button>
            </section>

            {hasActiveFilters && resultCount !== null && totalCount !== null && (
                <p className="mt-4 text-sm text-center text-gray-600">
                    Mostrando {resultCount} de {totalCount} eventos
                </p>
            )}
        </section>
    );
}

export default EventFilters;