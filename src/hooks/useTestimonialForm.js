import { useState } from 'react';
import { useToastContext } from '../context/ToastContext';
import testimonialService from '../services/testimonialService';

const initialFormData = {
    name: '',
    role: '',
    location: '',
    content: ''
};

export function useTestimonialForm(onSuccess) {
    const { showSuccess, showError } = useToastContext();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            showError('El nombre es obligatorio');
            return false;
        }

        if (formData.name.trim().length < 2) {
            showError('El nombre debe tener al menos 2 caracteres');
            return false;
        }

        if (!formData.content.trim()) {
            showError('El testimonio es obligatorio');
            return false;
        }

        if (formData.content.trim().length < 50) {
            showError('El testimonio debe tener al menos 50 caracteres');
            return false;
        }

        if (formData.content.length > 300) {
            showError('El testimonio no puede superar los 300 caracteres');
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
            await testimonialService.createTestimonial(formData);
            showSuccess('✓ ¡Gracias por tu testimonio! Se ha publicado correctamente');
            setFormData(initialFormData);

            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            }
        } catch (err) {
            console.error('Error al crear testimonio:', err);
            const errorMessage = err.response?.data?.message || 'Error al enviar el testimonio. Inténtalo de nuevo.';
            showError(`✕ ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
    };

    return {
        formData,
        loading,
        handleChange,
        handleSubmit,
        resetForm
    };
}