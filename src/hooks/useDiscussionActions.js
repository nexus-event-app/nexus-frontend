import { useState } from 'react';
import discussionService from '../services/discussionService';

export function useDiscussionActions(onSuccess) {
    const [deleting, setDeleting] = useState(false);

    const deleteDiscussion = async (discussionId, userId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta discusión? Esta acción no se puede deshacer.')) {
            return;
        }

        try {
            setDeleting(true);
            await discussionService.deleteDiscussion(discussionId, userId);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al eliminar discusión:', error);
            alert('Error al eliminar la discusión');
        } finally {
            setDeleting(false);
        }
    };

    return {
        deleteDiscussion,
        deleting
    };
}