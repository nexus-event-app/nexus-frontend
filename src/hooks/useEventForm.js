import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastContext } from '../context/ToastContext';
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
    const { showSuccess, showError } = useToastContext();
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(!!eventId);
    const [saving, setSaving] = useState(false);

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
                showError('✕ Error al cargar el evento');
            } finally {
                setLoading(false);
            }
        };

        loadEvent();
    }, [eventId]);

    const validateForm = () => {
        if (!formData.title.trim()) {
            showError('El título es obligatorio');
            return false;
        }
        if (formData.title.trim().length < 5) {
            showError('El título debe tener al menos 5 caracteres');
            return false;
        }
        if (!formData.description.trim()) {
            showError('La descripción es obligatoria');
            return false;
        }
        if (!formData.eventDate) {
            showError('La fecha del evento es obligatoria');
            return false;
        }
        if (!formData.location.trim()) {
            showError('La ubicación es obligatoria');
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSaving(true);
        try {
            if (eventId) {
                await eventService.updateEvent(eventId, formData);
                showSuccess('✓ Evento actualizado correctamente');
            } else {
                await eventService.createEvent(formData);
                showSuccess('✓ Evento creado correctamente');
            }
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            showError(err.response?.data?.message || `✕ Error al ${eventId ? 'actualizar' : 'crear'} el evento`);
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
        handleChange,
        handleSubmit,
        handleCancel
    };
}