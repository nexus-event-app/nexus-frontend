import { useState, useEffect } from 'react';
import testimonialService from '../services/testimonialService';

export function useTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [displayedTestimonials, setDisplayedTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCount, setShowCount] = useState(8);

    useEffect(() => {
        loadTestimonials();
    }, []);

    useEffect(() => {
        setDisplayedTestimonials(testimonials.slice(0, showCount));
    }, [testimonials, showCount]);

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

    const loadMore = () => {
        setShowCount(prev => prev + 8);
    };

    const hasMore = showCount < testimonials.length;

    return {
        testimonials,
        displayedTestimonials,
        loading,
        hasMore,
        loadMore,
        reloadTestimonials: loadTestimonials
    };
}