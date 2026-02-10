import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import discussionService from '../services/discussionService';

export function useCreateDiscussion() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'AYUDA_TECNICA'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }

        if (!formData.title.trim() || !formData.content.trim()) {
            setError('El título y el contenido son obligatorios');
            return;
        }

        try {
            setLoading(true);
            await discussionService.createDiscussion(formData, user.id);
            navigate('/foro');
        } catch (err) {
            console.error('Error al crear discusión:', err);
            setError('Error al crear la discusión. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/foro');
    };

    return {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
        handleCancel
    };
}