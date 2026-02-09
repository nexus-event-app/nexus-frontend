import { useState, useEffect } from 'react';
import newsService from '../services/newsService';

export function useNews() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('TODAS');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 12;

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const data = await newsService.getAllNews();
            setNews(data);
        } catch (error) {
            console.error('Error al cargar noticias:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredNews = news.filter(item => {
        const matchesCategory = selectedCategory === 'TODAS' || item.category === selectedCategory;
        const matchesSearch = searchTerm === '' ||
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.content?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);
    const totalPages = Math.ceil(filteredNews.length / newsPerPage);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const clearFilters = () => {
        setSelectedCategory('TODAS');
        setSearchTerm('');
        setCurrentPage(1);
    };

    const hasActiveFilters = selectedCategory !== 'TODAS' || searchTerm !== '';

    return {
        news: currentNews,
        allNews: news,
        loading,
        selectedCategory,
        searchTerm,
        currentPage,
        totalPages,
        totalResults: filteredNews.length,
        hasActiveFilters,
        handleCategoryChange,
        handleSearchChange,
        handlePageChange,
        clearFilters
    };
}