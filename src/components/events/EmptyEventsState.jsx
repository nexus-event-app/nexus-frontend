import React from 'react';

function EmptyEventsState({ hasActiveFilters, onClearFilters }) {
    return (
        <section className="p-12 text-center bg-white border border-gray-200 rounded-xl">
            <p className="text-xl text-gray-600">
                {hasActiveFilters
                    ? 'No hay eventos que coincidan con tu búsqueda'
                    : 'No hay eventos disponibles en este momento'}
            </p>
            {hasActiveFilters && (
                <button
                    onClick={onClearFilters}
                    className="px-6 py-2 mt-4 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                    Ver todos los eventos
                </button>
            )}
        </section>
    );
}

export default EmptyEventsState;