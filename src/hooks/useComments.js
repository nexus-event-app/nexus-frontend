import { useState } from 'react';
import commentService from '../services/commentService';

export function useComments(discussionId, onSuccess) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [commentText, setCommentText] = useState('');

    const createComment = async (userId) => {
        if (!commentText.trim()) {
            setError('El comentario no puede estar vacío');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await commentService.createComment({
                discussionId,
                content: commentText
            }, userId);
            setCommentText('');
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('Error al crear comentario:', err);
            setError('Error al publicar el comentario');
        } finally {
            setLoading(false);
        }
    };

    const deleteComment = async (commentId, userId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
            return;
        }

        try {
            setDeleting(true);
            await commentService.deleteComment(commentId, userId);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            console.error('Error al eliminar comentario:', err);
            alert('Error al eliminar el comentario');
        } finally {
            setDeleting(false);
        }
    };

    return {
        commentText,
        setCommentText,
        loading,
        error,
        deleting,
        createComment,
        deleteComment
    };
}