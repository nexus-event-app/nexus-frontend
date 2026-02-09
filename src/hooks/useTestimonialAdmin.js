import { useState, useEffect } from 'react';
import testimonialService from '../services/testimonialService';

export function useTestimonialAdmin() {
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
        } catch (error) {
            console.error('Error al destacar testimonio:', error);
        }
    };

    const handleToggleActive = async (id, currentValue) => {
        try {
            await testimonialService.updateTestimonial(id, {
                isActive: !currentValue
            });
            loadTestimonials();
        } catch (error) {
            console.error('Error al cambiar estado:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este testimonio?')) {
            try {
                await testimonialService.deleteTestimonial(id);
                loadTestimonials();
            } catch (error) {
                console.error('Error al eliminar testimonio:', error);
            }
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