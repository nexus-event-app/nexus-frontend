import { useState, useEffect } from 'react';
import { useToastContext } from '../context/ToastContext';
import testimonialService from '../services/testimonialService';

export function useTestimonialAdmin() {
    const { showSuccess, showError } = useToastContext();
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTestimonials();
    }, []);

    const loadTestimonials = async () => {
        try {
            const data = await testimonialService.getAllTestimonials();
            setTestimonials(data);
        } catch (error) {
            console.error('Error al cargar testimonios:', error);
            showError('✕ Error al cargar los testimonios');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleHighlight = async (id, currentValue) => {
        try {
            await testimonialService.updateTestimonial(id, {
                isHighlighted: !currentValue
            });
            loadTestimonials();
            showSuccess(currentValue ? '✓ Testimonio desmarcado como destacado' : '✓ Testimonio marcado como destacado');
        } catch (error) {
            console.error('Error al destacar testimonio:', error);
            showError('✕ Error al cambiar estado destacado');
        }
    };

    const handleToggleActive = async (id, currentValue) => {
        try {
            await testimonialService.updateTestimonial(id, {
                isActive: !currentValue
            });
            loadTestimonials();
            showSuccess(currentValue ? '✓ Testimonio ocultado' : '✓ Testimonio publicado');
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            showError('✕ Error al cambiar visibilidad');
        }
    };

    const handleDelete = async (id) => {
        try {
            await testimonialService.deleteTestimonial(id);
            loadTestimonials();
            showSuccess('✓ Testimonio eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar testimonio:', error);
            showError('✕ Error al eliminar el testimonio');
            throw error;
        }
    };

    return {
        testimonials,
        loading,
        handleToggleHighlight,
        handleToggleActive,
        handleDelete
    };
}