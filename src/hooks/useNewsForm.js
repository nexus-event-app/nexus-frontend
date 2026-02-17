import { useState, useEffect } from 'react';
import { useToastContext } from '../context/ToastContext';
import newsService from '../services/newsService';

const initialFormData = {
    title: '',
    content: '',
    sourceUrl: '',
    imageUrl: '',
    imageName: '',
    author: '',
    category: 'GENERAL',
    isActive: true
};

export function useNewsForm() {
    const { showSuccess, showError } = useToastContext();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [formData, setFormData] = useState(initialFormData);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const data = await newsService.getAllNews();
            setNews(data);
        } catch (error) {
            console.error('Error al cargar noticias:', error);
            showError('✕ Error al cargar las noticias');
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

    const handleImageChange = (imageUrl, imageName) => {
        setFormData(prev => ({ ...prev, imageUrl, imageName }));
    };

    const handleImageRemove = () => {
        setFormData(prev => ({ ...prev, imageUrl: '', imageName: '' }));
    };

    const handleCreateClick = () => {
        setEditingNews(null);
        setFormData(initialFormData);
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
        setShowForm(true);
    };

    const validateForm = () => {
        if (!formData.title.trim()) {
            showError('El título es obligatorio');
            return false;
        }
        if (formData.title.trim().length < 5) {
            showError('El título debe tener al menos 5 caracteres');
            return false;
        }
        if (!formData.content.trim()) {
            showError('El contenido es obligatorio');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setFormLoading(true);
        try {
            if (editingNews) {
                await newsService.updateNews(editingNews.id, formData);
                showSuccess('✓ Noticia actualizada correctamente');
            } else {
                await newsService.createNews(formData);
                showSuccess('✓ Noticia creada correctamente');
            }
            await loadNews();
            setTimeout(() => setShowForm(false), 1500);
        } catch (error) {
            showError(error.response?.data?.message || '✕ Error al guardar la noticia');
        } finally {
            setFormLoading(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingNews(null);
    };

    const handleDelete = async (id) => {
        try {
            await newsService.deleteNews(id);
            showSuccess('✓ Noticia eliminada correctamente');
            loadNews();
        } catch (error) {
            console.error('Error al eliminar noticia:', error);
            showError('✕ Error al eliminar la noticia');
            throw error;
        }
    };

    return {
        news,
        loading,
        showForm,
        editingNews,
        formData,
        formLoading,
        handleInputChange,
        handleImageChange,
        handleImageRemove,
        handleCreateClick,
        handleEditClick,
        handleSubmit,
        handleCancel,
        handleDelete
    };
}