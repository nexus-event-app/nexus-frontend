import { useState, useEffect } from 'react';
import testimonialService from '../services/testimonialService';

export function useDashboardTestimonials() {
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

    const activeCount = testimonials.filter(t => t.isActive).length;
    const highlightedCount = testimonials.filter(t => t.isHighlighted).length;

    return {
        testimonials,
        totalTestimonials: testimonials.length,
        activeTestimonials: activeCount,
        highlightedTestimonials: highlightedCount,
        loading
    };
}