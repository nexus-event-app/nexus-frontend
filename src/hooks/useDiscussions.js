    import { useState, useEffect } from 'react';
    import discussionService from '../services/discussionService';

    export function useDiscussions() {
    const [discussions, setDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('TODAS');
    const [searchTerm, setSearchTerm] = useState('');
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
        setCurrentPage(1);
        } catch (error) {
        console.error('Error al cargar discusiones:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSearchTerm('');
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const reloadDiscussions = () => {
        loadDiscussions();
    };

    const filteredDiscussions = discussions.filter(discussion => {
        if (!searchTerm) return true;
        
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = discussion.title.toLowerCase().includes(searchLower);
        const contentMatch = discussion.content.toLowerCase().includes(searchLower);
        const authorMatch = discussion.authorName.toLowerCase().includes(searchLower);
        
        return titleMatch || contentMatch || authorMatch;
    });

    const totalPages = Math.ceil(filteredDiscussions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedDiscussions = filteredDiscussions.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return {
        discussions: paginatedDiscussions,
        allDiscussions: filteredDiscussions,
        loading,
        selectedCategory,
        searchTerm,
        currentPage,
        totalPages,
        handleCategoryChange,
        handleSearchChange,
        handlePageChange,
        reloadDiscussions
    };
    }