import { useState, useEffect } from 'react';
import discussionService from '../services/discussionService';

export function useDiscussions() {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('TODAS');

    useEffect(() => {
        loadDiscussions();
    }, [selectedCategory]);

    const loadDiscussions = async () => {
        try {
            setLoading(true);
            const data = selectedCategory === 'TODAS'
                ? await discussionService.getAllDiscussions()
                : await discussionService.getDiscussionsByCategory(selectedCategory);
            setDiscussions(data);
        } catch (error) {
            console.error('Error al cargar discusiones:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return {
        discussions,
        loading,
        selectedCategory,
        handleCategoryChange,
        reloadDiscussions: loadDiscussions
    };
}