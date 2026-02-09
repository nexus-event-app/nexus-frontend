import { useState } from 'react';
import testimonialService from '../services/testimonialService';

const initialFormData = {
    name: '',
    role: '',
    location: '',
    content: ''
};

export function useTestimonialForm(onSuccess) {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        setSuccess('');
        setLoading(true);

        try {
            await testimonialService.createTestimonial(formData);
            setSuccess('¡Gracias por tu testimonio! Se ha publicado correctamente.');
            setFormData(initialFormData);

            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error al enviar el testimonio. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setError('');
        setSuccess('');
    };

    return {
        formData,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
        resetForm
    };
}