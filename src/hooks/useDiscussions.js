    import { useState, useEffect } from 'react';
    import discussionService from '../services/discussionService';

    export function useDiscussions() {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('TODAS');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    useEffect(() => {
        loadDiscussions();
    }, [selectedCategory]);

    const loadDiscussions = async () => {
        try {
        setLoading(true);
        let data;

        if (selectedCategory === 'TODAS') {
            data = await discussionService.getAllDiscussions();
        } else {
            data = await discussionService.getDiscussionsByCategory(selectedCategory);
        }

        setDiscussions(data);
        setCurrentPage(1); // Reset a página 1 cuando cambia categoría
        } catch (error) {
        console.error('Error al cargar discusiones:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const reloadDiscussions = () => {
        loadDiscussions();
    };

    // Paginación
    const totalPages = Math.ceil(discussions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedDiscussions = discussions.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        discussions: paginatedDiscussions,
        allDiscussions: discussions,
        loading,
        selectedCategory,
        currentPage,
        totalPages,
        handleCategoryChange,
        handlePageChange,
        reloadDiscussions
    };
    }