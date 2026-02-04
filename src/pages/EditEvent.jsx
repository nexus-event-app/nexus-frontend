    import React, { useState, useEffect } from 'react';
    import { useNavigate, useParams } from 'react-router-dom';
    import eventService from '../services/eventService';
    import EventForm from '../components/events/EventForm';

    function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventDate: '',
        location: '',
        eventType: '',
        level: '',
        tags: '',
        sourceUrl: '',
        organizerName: '',
        isActive: true
    });

    useEffect(() => {
        const loadEvent = async () => {
        try {
            const event = await eventService.getEventById(id);

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
    }, [id]);

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
        await eventService.updateEvent(id, formData);
        setSuccess(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
        } catch (err) {
        setError(err.response?.data?.message || 'Error al actualizar el evento');
        } finally {
        setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
        <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <p className="text-gray-600">Cargando evento...</p>
        </main>
        );
    }

    return (
        <>
        <header className="bg-white shadow-sm">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-indigo-600">
                Nexus Admin
            </h1>
            <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm text-gray-700 transition hover:text-indigo-600"
            >
                ← Volver al Dashboard
            </button>
            </nav>
        </header>

        <main className="min-h-screen py-8 bg-gray-50">
            <section className="max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
            <header className="mb-6">
                <h2 className="mb-2 text-3xl font-bold text-gray-900">
                Editar Evento
                </h2>
                <p className="text-gray-600">
                Actualiza la información del evento
                </p>
            </header>

            <EventForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={saving}
                error={error}
                success={success}
                isEdit={true}
            />
            </section>
        </main>
        </>
    );
    }

    export default EditEvent;
