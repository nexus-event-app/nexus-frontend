import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '../context/ToastContext';
import discussionService from '../services/discussionService';

export function useCreateDiscussion() {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToastContext();
    const [loading, setLoading] = useState(false);
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

    const validateForm = () => {
        if (!formData.title.trim()) {
            showError('El título es obligatorio');
            return false;
        }
        
        if (formData.title.trim().length < 5) {
            showError('El título debe tener al menos 5 caracteres');
            return false;
        }

        if (formData.title.length > 200) {
            showError('El título no puede superar los 200 caracteres');
            return false;
        }

        if (!formData.content.trim()) {
            showError('El contenido es obligatorio');
            return false;
        }

        if (formData.content.trim().length < 10) {
            showError('El contenido debe tener al menos 10 caracteres');
            return false;
        }

        if (!formData.category) {
            showError('Debes seleccionar una categoría');
            return false;
        }

        return true;
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    try {
        setLoading(true);
        
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user ? user.id : null;
        
        await discussionService.createDiscussion(formData, userId);
        showSuccess('✓ Discusión creada correctamente');
        navigate('/foro');
    } catch (err) {
        console.error('Error al crear discusión:', err);
        showError('✕ Error al crear la discusión. Inténtalo de nuevo.');
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
        handleChange,
        handleSubmit,
        handleCancel
    };
}