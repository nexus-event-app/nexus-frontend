import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDiscussionActions } from '../../hooks/useDiscussionActions';
import { getCategoryLabel, getCategoryColor, formatRelativeDate } from '../../utils/forumHelpers';
import EditDiscussionModal from './EditDiscussionModal';
import discussionService from '../../services/discussionService';

function DiscussionCard({ discussion: initialDiscussion, onDeleted, onUpdated }) {
    const [discussion, setDiscussion] = useState(initialDiscussion);
    const [showEditModal, setShowEditModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [liking, setLiking] = useState(false);

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const { deleteDiscussion, deleting } = useDiscussionActions(onDeleted);

    const canEdit = user && user.id === discussion.authorId;
    const canDelete = user && (user.id === discussion.authorId || user.role === 'ADMIN');

    const handleDelete = () => {
        deleteDiscussion(discussion.id, user.id);
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleSaveEdit = async (formData) => {
        try {
            setSaving(true);
            const updated = await discussionService.updateDiscussion(
                discussion.id,
                formData,
                user.id
            );
            setDiscussion(updated);
            setShowEditModal(false);
            if (onUpdated) onUpdated(updated);
        } catch (error) {
            console.error('Error al actualizar discusión:', error);
            alert('Error al guardar los cambios');
        } finally {
            setSaving(false);
        }
    };

    const handleToggleLike = async () => {
        if (!user) {
            alert('Debes iniciar sesión para dar like');
            return;
        }

        try {
            setLiking(true);
            const updated = await discussionService.toggleLike(discussion.id, user.id);
            setDiscussion(updated);
        } catch (error) {
            console.error('Error al dar like:', error);
        } finally {
            setLiking(false);
        }
    };

    return (
        <>
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

                        <section className="flex items-center gap-2">
                            <button
                                onClick={handleToggleLike}
                                disabled={liking || !user}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${discussion.isLikedByCurrentUser
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-300`}
                                aria-label={discussion.isLikedByCurrentUser ? 'Quitar like' : 'Dar like'}
                            >
                                <svg
                                    className={`w-4 h-4 transition-transform ${liking ? 'animate-pulse' : 'group-hover:scale-110'}`}
                                    fill={discussion.isLikedByCurrentUser ? 'currentColor' : 'none'}
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
                                <span className="text-xs font-semibold">{discussion.likesCount || 0}</span>
                            </button>

                            <Link
                                to={`/foro/${discussion.id}#add-response`}
                                className="flex items-center justify-center gap-1 px-3 py-1 transition-all rounded-full bg-gray-50 hover:bg-indigo-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                aria-label={`Ver ${discussion.commentCount} ${discussion.commentCount === 1 ? 'respuesta' : 'respuestas'} y responder`}
                            >
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="text-xs font-semibold text-gray-700">{discussion.commentCount}</span>
                            </Link>
                        </section>
                    </section>
                </footer>

                <section className="absolute flex gap-2 top-3 right-3 sm:top-4 sm:right-4">
                    {canEdit && (
                        <button
                            onClick={handleEdit}
                            className="px-2 py-1 text-xs font-semibold text-blue-600 transition-all bg-blue-100 rounded-lg shadow-sm sm:px-3 hover:bg-blue-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Editar discusión"
                        >
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span className="hidden sm:inline"></span>
                            </span>
                        </button>
                    )}

                    {canDelete && (
                        <button
                            onClick={handleDelete}
                            disabled={deleting}
                            className="px-2 py-1 text-xs font-semibold text-red-600 transition-all bg-red-100 rounded-lg shadow-sm sm:px-3 hover:bg-red-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Eliminar discusión"
                        >
                            {deleting ? (
                                <span className="flex items-center gap-1">
                                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <span aria-hidden="true">×</span>
                                    <span className="hidden sm:inline"></span>
                                </span>
                            )}
                        </button>
                    )}
                </section>
            </article>

            {showEditModal && (
                <EditDiscussionModal
                    discussion={discussion}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveEdit}
                    saving={saving}
                />
            )}
        </>
    );
}

export default DiscussionCard;