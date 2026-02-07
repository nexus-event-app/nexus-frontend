    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import eventService from '../services/eventService';

    const initialFormData = {
    title: '',
    description: '',
    eventDate: '',
    location: 'Barcelona',
    eventType: 'NETWORKING',
    level: 'JUNIOR_FRIENDLY',
    tags: '',
    sourceUrl: '',
    organizerName: 'Nexus Team',
    isActive: true
    };

    export function useEventForm(eventId = null) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(!!eventId);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!eventId) return;

        const loadEvent = async () => {
        try {
            const event = await eventService.getEventById(eventId);
            const eventDateFormatted = event.eventDate
            ? new Date(event.eventDate).toISOString().slice(0, 16)
            : '';

            setFormData({
            title: event.title || '',
            description: event.description || '',
            eventDate: eventDateFormatted,
            location: event.location || '',
            eventType: event.eventType || '',
            level: event.level || '',
            tags: event.tags || '',
            sourceUrl: event.sourceUrl || '',
            organizerName: event.organizerName || '',
            isActive: event.isActive ?? true
            });
        } catch (err) {
            setError('Error al cargar el evento');
        } finally {
            setLoading(false);
        }
        };

        loadEvent();
    }, [eventId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSaving(true);

        try {
        if (eventId) {
            await eventService.updateEvent(eventId, formData);
        } else {
            await eventService.createEvent(formData);
        }
        
        setSuccess(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
        } catch (err) {
        setError(err.response?.data?.message || `Error al ${eventId ? 'actualizar' : 'crear'} el evento`);
        } finally {
        setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    return {
        formData,
        loading,
        saving,
        error,
        success,
        handleChange,
        handleSubmit,
        handleCancel
    };
    }