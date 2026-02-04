    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import eventService from '../services/eventService';
    import EventForm from '../components/events/EventForm';

    function CreateEvent() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventDate: '',
        location: 'Barcelona',
        eventType: 'NETWORKING',
        level: 'JUNIOR_FRIENDLY',
        tags: '',
        sourceUrl: '',
        organizerName: 'Nexus Team'
    });

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
        setLoading(true);

        try {
        await eventService.createEvent(formData);
        setSuccess(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
        } catch (err) {
        setError(err.response?.data?.message || 'Error al crear el evento');
        } finally {
        setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

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
                Crear Nuevo Evento
                </h2>
                <p className="text-gray-600">
                Añade un evento para la comunidad tech junior
                </p>
            </header>

            <EventForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
                error={error}
                success={success}
                isEdit={false}
            />
            </section>
        </main>
        </>
    );
    }

    export default CreateEvent;