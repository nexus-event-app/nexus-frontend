import React from 'react';

function CommentCard({ comment, canDelete, onDelete, deleting }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 1) return 'Hace unos minutos';
        if (hours < 24) return `Hace ${hours}h`;
        if (days < 7) return `Hace ${days}d`;
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <article className="p-4 border-l-4 border-indigo-200 bg-gray-50">
            <header className="flex items-center justify-between mb-3">
                <section className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white bg-indigo-500 rounded-full">
                        {comment.authorName.charAt(0).toUpperCase()}
                    </span>
                    <section>
                        <p className="font-semibold text-gray-900">{comment.authorName}</p>
                        <time className="text-sm text-gray-500">{formatDate(comment.createdAt)}</time>
                    </section>
                </section>

                {canDelete && (
                    <button
                        onClick={onDelete}
                        disabled={deleting}
                        className="px-3 py-1 text-xs font-medium text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50"
                        aria-label="Eliminar comentario"
                    >
                        {deleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                )}
            </header>

            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
        </article>
    );
}

export default CommentCard;