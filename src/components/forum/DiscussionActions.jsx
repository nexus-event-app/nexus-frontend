import React from 'react';

function DiscussionActions({
    canEdit,
    canDelete,
    onEdit,
    onDelete,
    deleting
}) {
    if (!canEdit && !canDelete) return null;

    return (
        <section className="absolute flex gap-2 top-3 right-3 sm:top-4 sm:right-4">
            {canEdit && (
                <button
                    onClick={onEdit}
                    className="px-2 py-1 text-xs font-semibold text-blue-600 transition-all bg-blue-100 rounded-lg shadow-sm sm:px-3 hover:bg-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Editar discusión"
                >
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span className="hidden sm:inline"></span>
                    </span>
                </button>
            )}

            {canDelete && (
                <button
                    onClick={onDelete}
                    disabled={deleting}
                    className="px-2 py-1 text-xs font-semibold text-red-600 transition-all bg-red-100 rounded-lg shadow-sm sm:px-3 hover:bg-red-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Eliminar discusión"
                >
                    {deleting ? (
                        <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    ) : (
                        <span className="flex items-center gap-1">
                            <span>×</span>
                            <span className="hidden sm:inline"></span>
                        </span>
                    )}
                </button>
            )}
        </section>
    );
}

export default DiscussionActions;