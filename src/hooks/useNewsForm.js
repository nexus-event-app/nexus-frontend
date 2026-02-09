    import { useState, useEffect } from 'react';
    import newsService from '../services/newsService';

    const initialFormData = {
    title: '',
    content: '',
    sourceUrl: '',
    imageUrl: '',
    author: '',
    category: 'GENERAL',
    isActive: true
    };

    export function useNewsForm() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCreateClick = () => {
        setEditingNews(null);
        setFormData(initialFormData);
        setFormError('');
        setFormSuccess('');
        setShowForm(true);
    };

    const handleEditClick = (item) => {
        setEditingNews(item);
        setFormData({
        title: item.title,
        content: item.content || '',
        sourceUrl: item.sourceUrl || '',
        imageUrl: item.imageUrl || '',
        author: item.author || '',
        category: item.category || 'GENERAL',
        isActive: item.isActive
        });
        setFormError('');
        setFormSuccess('');
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');
        setFormSuccess('');

        try {
        if (editingNews) {
            await newsService.updateNews(editingNews.id, formData);
            setFormSuccess('Noticia actualizada correctamente');
        } else {
            await newsService.createNews(formData);
            setFormSuccess('Noticia creada correctamente');
        }
        
        await loadNews();
        setTimeout(() => {
            setShowForm(false);
            setFormSuccess('');
        }, 1500);
        } catch (error) {
        setFormError(error.response?.data?.message || 'Error al guardar la noticia');
        } finally {
        setFormLoading(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingNews(null);
        setFormError('');
        setFormSuccess('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
        try {
            await newsService.deleteNews(id);
            loadNews();
        } catch (error) {
            console.error('Error al eliminar noticia:', error);
        }
        }
    };

    return {
        news,
        loading,
        showForm,
        editingNews,
        formData,
        formLoading,
        formError,
        formSuccess,
        handleInputChange,
        handleCreateClick,
        handleEditClick,
        handleSubmit,
        handleCancel,
        handleDelete
    };
    }