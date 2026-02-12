import React from 'react';
import { Link } from 'react-router-dom';
import { formatRelativeDate } from '../../utils/forumHelpers';

function DiscussionFooter({
    discussion,
    user,
    liking,
    onToggleLike
}) {
    return (
        <footer className="pt-3 mt-auto border-t border-gray-100 sm:pt-4">
            <section className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 sm:flex-row">
                <address className="flex items-center gap-2 not-italic">
                    <span className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                        {discussion.authorName.charAt(0).toUpperCase()}
                    </span>
                    <section className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-700">
                            {discussion.authorName}
                        </span>
                        <time dateTime={discussion.createdAt} className="text-xs text-gray-400">
                            {formatRelativeDate(discussion.createdAt)}
                        </time>
                    </section>
                </address>

                <section className="flex items-center gap-2">
                    <button
                        onClick={() => onToggleLike(user?.id)}
                        disabled={liking || !user}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${discussion.isLikedByCurrentUser
                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300`}
                        aria-label={discussion.isLikedByCurrentUser ? 'Quitar like' : 'Dar like'}
                    >
                        <svg
                            className={`w-4 h-4 transition-transform ${liking ? 'animate-pulse' : 'hover:scale-110'}`}
                            fill={discussion.isLikedByCurrentUser ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span className="text-xs font-semibold">{discussion.likesCount || 0}</span>
                    </button>

                    <Link
                        to={`/foro/${discussion.id}#add-response`}
                        className="flex items-center gap-1 px-3 py-1 transition-all rounded-full bg-gray-50 hover:bg-indigo-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        aria-label={`Ver ${discussion.commentCount} ${discussion.commentCount === 1 ? 'respuesta' : 'respuestas'} y responder`}
                    >
                        <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700">{discussion.commentCount}</span>
                    </Link>
                </section>
            </section>
        </footer>
    );
}

export default DiscussionFooter;