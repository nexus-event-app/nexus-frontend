import { useState } from 'react';
import { useToastContext } from '../context/ToastContext';
import commentService from '../services/commentService';

export function useComments(discussionId, onSuccess) {
    const { showSuccess, showError } = useToastContext();
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [commentText, setCommentText] = useState('');

    const createComment = async (userId) => {
        if (!commentText.trim()) {
            showError('El comentario no puede estar vacío');
            return;
        }

        if (commentText.trim().length < 3) {
            showError('El comentario debe tener al menos 3 caracteres');
            return;
        }

        try {
            setLoading(true);
            await commentService.createComment({
                discussionId,
                content: commentText
            }, userId);
            setCommentText('');
            showSuccess('✓ Comentario publicado correctamente');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('Error al crear comentario:', err);
            showError('✕ Error al publicar el comentario');
        } finally {
            setLoading(false);
        }
    };

    const deleteComment = async (commentId, userId) => {
        try {
            setDeleting(true);
            await commentService.deleteComment(commentId, userId);
            showSuccess('✓ Comentario eliminado correctamente');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('Error al eliminar comentario:', err);
            showError('✕ Error al eliminar el comentario');
            throw err;
        } finally {
            setDeleting(false);
        }
    };

    return {
        commentText,
        setCommentText,
        loading,
        deleting,
        createComment,
        deleteComment
    };
}