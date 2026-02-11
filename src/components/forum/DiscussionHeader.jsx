import React from 'react';
import { getCategoryLabel, getCategoryColor, formatDate } from '../../utils/forumHelpers';

function DiscussionHeader({ discussion, commentsCount }) {
    return (
        <article className="p-6 mb-8 transition-all duration-300 bg-white border-2 border-gray-200 shadow-lg sm:p-8 rounded-xl hover:shadow-2xl">
            <header className="mb-6">
                <span className={`inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full ${getCategoryColor(discussion.category)}`}>
                    {getCategoryLabel(discussion.category)}
                </span>
            </header>

            <h2 className="mb-6 text-xl font-bold text-center text-gray-900 sm:text-3xl lg:text-3xl">
                {discussion.title}
            </h2>

            <address className="flex items-center justify-center gap-3 mb-6 not-italic">
                <span
                    className="flex items-center justify-center w-10 h-10 text-sm font-bold text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"
                    aria-hidden="true"
                >
                    {discussion.authorName.charAt(0).toUpperCase()}
                </span>
                <section className="flex flex-col text-sm sm:flex-row sm:items-center sm:gap-2">
                    <span className="font-semibold text-gray-900">{discussion.authorName}</span>
                    <span className="hidden text-gray-400 sm:inline" aria-hidden="true">•</span>
                    <time dateTime={discussion.createdAt} className="text-gray-500">
                        {formatDate(discussion.createdAt)}
                    </time>
                </section>
            </address>

            <p className="mb-6 text-base leading-relaxed text-center text-gray-700 whitespace-pre-wrap sm:text-lg">
                {discussion.content}
            </p>

            <footer className="flex justify-center pt-6 border-t border-gray-100">
                <aside
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50"
                    aria-label={`${commentsCount} ${commentsCount === 1 ? 'respuesta' : 'respuestas'}`}
                >
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-sm font-bold text-gray-900">
                        {commentsCount} {commentsCount === 1 ? 'respuesta' : 'respuestas'}
                    </span>
                </aside>
            </footer>
        </article>
    );
}

export default DiscussionHeader;