import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import discussionService from '../services/discussionService';
import commentService from '../services/commentService';

export function useDiscussionDetail(discussionId) {
    const navigate = useNavigate();
    const [discussion, setDiscussion] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadDiscussionAndComments();
    }, [discussionId]);

    const loadDiscussionAndComments = async () => {
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            
            const [discussionData, commentsData] = await Promise.all([
                discussionService.getDiscussionById(discussionId),
                commentService.getCommentsByDiscussion(discussionId, user?.id)
            ]);
            setDiscussion(discussionData);
            setComments(commentsData);
        } catch (err) {
            console.error('Error al cargar discusión:', err);
            setError('Error al cargar la discusión');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/foro');
    };

    return {
        discussion,
        comments,
        loading,
        error,
        handleBack,
        reloadComments: loadDiscussionAndComments
    };
}