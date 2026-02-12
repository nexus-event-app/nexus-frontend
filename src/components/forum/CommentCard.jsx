import React, { useState } from 'react';
import commentService from '../../services/commentService';

function CommentCard({ comment: initialComment, canDelete, onDelete, deleting }) {
    const [comment, setComment] = useState(initialComment);
    const [liking, setLiking] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || 'null');

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

    const handleToggleLike = async () => {
        if (!user) {
            alert('Debes iniciar sesión para dar like');
            return;
        }

        try {
            setLiking(true);
            const updated = await commentService.toggleLike(comment.id, user.id);
            setComment(updated);
        } catch (error) {
            console.error('Error al dar like:', error);
        } finally {
            setLiking(false);
        }
    };

    return (
        <article className="p-4 transition-all border-l-4 border-indigo-200 bg-gray-50 hover:bg-gray-100">
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

                <section className="flex items-center gap-2">
                    <button
                        onClick={handleToggleLike}
                        disabled={liking || !user}
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all ${
                            comment.isLikedByCurrentUser
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-white text-gray-600 hover:bg-gray-100'
                        } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300`}
                        aria-label={comment.isLikedByCurrentUser ? 'Quitar like' : 'Dar like'}
                    >
                        <svg
                            className={`w-4 h-4 transition-transform ${liking ? 'animate-pulse' : ''}`}
                            fill={comment.isLikedByCurrentUser ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                            />
                        </svg>
                        <span className="text-xs font-semibold">{comment.likesCount || 0}</span>
                    </button>

                    {canDelete && (
                        <button
                            onClick={onDelete}
                            disabled={deleting}
                            className="px-4 py-3 text-xs font-medium text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50"
                            aria-label="Eliminar comentario"
                        >
                            {deleting ? 'Eliminando...' : 'x'}
                        </button>
                    )}
                </section>
            </header>

            <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
        </article>
    );
}

export default CommentCard;