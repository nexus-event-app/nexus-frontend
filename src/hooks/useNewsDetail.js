import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import newsService from '../services/newsService';

export function useNewsDetail(newsId) {
    const [news, setNews] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadNewsDetail();
    }, [newsId]);

    const loadNewsDetail = async () => {
        try {
            setLoading(true);
            setError(null);

            const newsData = await newsService.getNewsById(newsId);
            setNews(newsData);

            const allNews = await newsService.getAllNews();
            const related = allNews
                .filter(item =>
                    item.category === newsData.category &&
                    item.id !== newsData.id
                )
                .slice(0, 3);

            setRelatedNews(related);
        } catch (error) {
            console.error('Error al cargar noticia:', error);
            setError('No se pudo cargar la noticia');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/noticias');
    };

    return {
        news,
        relatedNews,
        loading,
        error,
        handleBack
    };
}