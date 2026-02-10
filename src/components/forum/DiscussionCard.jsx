import React from 'react';
import { Link } from 'react-router-dom';
import { useDiscussionActions } from '../../hooks/useDiscussionActions';

function DiscussionCard({ discussion, onDeleted }) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const { deleteDiscussion, deleting } = useDiscussionActions(onDeleted);

    const getCategoryColor = (category) => {
        const colors = {
            AYUDA_TECNICA: 'bg-blue-100 text-blue-800',
            RECURSOS: 'bg-green-100 text-green-800',
            EXPERIENCIAS: 'bg-purple-100 text-purple-800',
            NETWORKING: 'bg-pink-100 text-pink-800',
            GENERAL: 'bg-gray-100 text-gray-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const getCategoryLabel = (category) => {
        const labels = {
            AYUDA_TECNICA: 'Ayuda Técnica',
            RECURSOS: 'Recursos',
            EXPERIENCIAS: 'Experiencias',
            NETWORKING: 'Networking',
            GENERAL: 'General'
        };
        return labels[category] || category;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (hours < 1) return 'Hace unos minutos';
        if (hours < 24) return `Hace ${hours}h`;
        if (days < 7) return `Hace ${days}d`;
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };

    const canDelete = user && (user.id === discussion.authorId || user.role === 'ADMIN');

    const handleDelete = () => {
        deleteDiscussion(discussion.id, user.id);
    };

    return (
        <article className="p-6 transition bg-white border border-gray-200 rounded-lg hover:shadow-md">
            <header className="mb-4">
                <nav className="flex flex-wrap items-center justify-between gap-2 mb-3" aria-label="Metadatos de la discusión">
                    <section className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(discussion.category)}`}>
                            {getCategoryLabel(discussion.category)}
                        </span>
                        <span className="text-sm text-gray-500">
                            Por <strong>{discussion.authorName}</strong> • {formatDate(discussion.createdAt)}
                        </span>
                    </section>

                    {canDelete && (
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="px-3 py-1 text-xs font-medium text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Eliminar discusión"
                        >
                            {deleting ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    )}
                </nav>

                <h2 className="mb-2 text-xl font-bold text-gray-900 hover:text-indigo-600">
                    <Link
                        to={`/foro/${discussion.id}`}
                        className="rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {discussion.title}
                    </Link>
                </h2>
            </header>

            <p className="mb-4 text-gray-700 line-clamp-2">
                {discussion.content}
            </p>

            <footer className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{discussion.commentCount} {discussion.commentCount === 1 ? 'respuesta' : 'respuestas'}</span>
                </span>
            </footer>
        </article>
    );
}

export default DiscussionCard;