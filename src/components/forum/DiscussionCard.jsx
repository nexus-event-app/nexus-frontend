import React from 'react';
import { Link } from 'react-router-dom';
import { useDiscussionActions } from '../../hooks/useDiscussionActions';
import { getCategoryLabel, getCategoryColor, formatRelativeDate } from '../../utils/forumHelpers';

function DiscussionCard({ discussion, onDeleted }) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const { deleteDiscussion, deleting } = useDiscussionActions(onDeleted);

    const canDelete = user && (user.id === discussion.authorId || user.role === 'ADMIN');

    const handleDelete = () => {
        deleteDiscussion(discussion.id, user.id);
    };

    return (
        <article className="relative flex flex-col h-full p-4 transition-all duration-300 bg-white border-2 border-gray-200 sm:p-6 rounded-xl hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-1">
            <header className="mb-3 sm:mb-4">
                <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full sm:px-4 sm:py-2 ${getCategoryColor(discussion.category)}`}>
                    {getCategoryLabel(discussion.category)}
                </span>
            </header>

            <h2 className="mb-3 text-lg font-bold text-center sm:mb-4 sm:text-xl">
                <Link
                    to={`/foro/${discussion.id}`}
                    className="text-gray-900 transition-colors rounded hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {discussion.title}
                </Link>
            </h2>

            <p className="flex-1 mb-3 text-sm text-center text-gray-600 sm:mb-4 sm:text-base line-clamp-3">
                {discussion.content}
            </p>

            <footer className="pt-3 mt-auto border-t border-gray-100 sm:pt-4">
                <section className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
                    <address className="flex items-center gap-2 not-italic">
                        <span className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" aria-hidden="true">
                            {discussion.authorName.charAt(0).toUpperCase()}
                        </span>
                        <section className="flex flex-col">
                            <span className="text-xs font-semibold text-gray-700">{discussion.authorName}</span>
                            <time dateTime={discussion.createdAt} className="text-xs text-gray-400">
                                {formatRelativeDate(discussion.createdAt)}
                            </time>
                        </section>
                    </address>

                    <aside className="flex items-center justify-center gap-1 px-3 py-1 rounded-full bg-gray-50" aria-label={`${discussion.commentCount} ${discussion.commentCount === 1 ? 'respuesta' : 'respuestas'}`}>
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700" aria-hidden="true">{discussion.commentCount}</span>
                    </aside>
                </section>
            </footer>

            {canDelete && (
                <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="absolute px-2 py-1 text-xs font-semibold text-red-600 transition-all bg-red-100 rounded-lg shadow-sm sm:px-3 top-3 right-3 sm:top-4 sm:right-4 hover:bg-red-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
                    aria-label="Eliminar discusión"
                >
                    {deleting ? (
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="sr-only">Eliminando discusión</span>
                        </span>
                    ) : (
                        <span className="flex items-center gap-1">
                            <span aria-hidden="true"></span>
                            <span className="hidden sm:inline">x</span>
                            <span className="sr-only">Eliminar discusión</span>
                        </span>
                    )}
                </button>
            )}
        </article>
    );
}

export default DiscussionCard;