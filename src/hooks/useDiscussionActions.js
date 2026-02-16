import { useState } from 'react';
import discussionService from '../services/discussionService';

export function useDiscussionActions(onSuccess) {
    const [deleting, setDeleting] = useState(false);

    const deleteDiscussion = async (discussionId, userId) => {
        try {
            setDeleting(true);
            await discussionService.deleteDiscussion(discussionId, userId);
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error al eliminar discusión:', error);
            throw error;
        } finally {
            setDeleting(false);
        }
    };

    return {
        deleteDiscussion,
        deleting
    };
}