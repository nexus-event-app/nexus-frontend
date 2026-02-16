import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDiscussionActions } from '../../hooks/useDiscussionActions';
import { useDiscussionLike } from '../../hooks/useDiscussionLike';
import { useToastContext } from '../../context/ToastContext';
import { getCategoryLabel, getCategoryColor } from '../../utils/forumHelpers';
import EditDiscussionModal from './EditDiscussionModal';
import DeleteConfirmModal from '../common/DeleteConfirmModal';
import DiscussionActions from './DiscussionActions';
import DiscussionFooter from './DiscussionFooter';
import discussionService from '../../services/discussionService';


function DiscussionCard({ discussion: initialDiscussion, onDeleted, onUpdated }) {
    const [discussion, setDiscussion] = useState(initialDiscussion);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [saving, setSaving] = useState(false);

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const { showSuccess, showError } = useToastContext();
    const { deleteDiscussion, deleting } = useDiscussionActions(onDeleted);
    const { liking, toggleLike } = useDiscussionLike(discussion, setDiscussion);

    const canEdit = user && user.id === discussion.authorId;
    const canDelete = user && (user.id === discussion.authorId || user.role === 'ADMIN');

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
            showSuccess('✓ Discusión editada correctamente');
            if (onUpdated) onUpdated(updated);
        } catch (error) {
            console.error('Error al actualizar discusión:', error);
            showError('✕ Error al guardar los cambios');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteDiscussion(discussion.id, user.id);
            setShowDeleteModal(false);
            showSuccess('✓ Discusión eliminada correctamente');
        } catch (error) {
            showError('✕ Error al eliminar la discusión');
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

                <DiscussionFooter
                    discussion={discussion}
                    user={user}
                    liking={liking}
                    onToggleLike={toggleLike}
                />

                <DiscussionActions
                    canEdit={canEdit}
                    canDelete={canDelete}
                    onEdit={() => setShowEditModal(true)}
                    onDelete={() => setShowDeleteModal(true)}
                    deleting={deleting}
                />
            </article>

            {showEditModal && (
                <EditDiscussionModal
                    discussion={discussion}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveEdit}
                    saving={saving}
                />
            )}

            {showDeleteModal && (
                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteConfirm}
                    loading={deleting}
                    type="discusión"
                />
            )}
        </>
    );
}

export default DiscussionCard;