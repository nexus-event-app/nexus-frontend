import { useState } from 'react';
import discussionService from '../services/discussionService';

export function useDiscussionLike(discussion, onUpdate) {
    const [liking, setLiking] = useState(false);

    const toggleLike = async (userId) => {
        if (!userId) {
            alert('Debes iniciar sesión para dar like');
            return;
        }

        if (!discussion?.id) {
            console.error('Discussion is undefined');
            return;
        }

        try {
            setLiking(true);
            const updated = await discussionService.toggleLike(discussion.id, userId);
            if (onUpdate) onUpdate(updated);
        } catch (error) {
            console.error('Error al dar like:', error);
        } finally {
            setLiking(false);
        }
    };

    return { liking, toggleLike };
}