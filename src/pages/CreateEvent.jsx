    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import eventService from '../services/eventService';

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

    return (
        <>
        <header className="bg-white shadow-sm">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-indigo-600">
                Nexus Admin
            </h1>
            <button
                onClick={() => navigate('/dashboard')}
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

            <form onSubmit={handleSubmit} className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                <fieldset disabled={loading}>
                <legend className="sr-only">Formulario de creación de evento</legend>

                {error && (
                    <p className="p-3 mb-6 text-sm text-red-600 rounded-lg bg-red-50" role="alert">
                    {error}
                    </p>
                )}

                {success && (
                    <p className="p-3 mb-6 text-sm text-green-600 rounded-lg bg-green-50" role="alert">
                    ¡Evento creado correctamente! Redirigiendo...
                    </p>
                )}

                <section className="space-y-6">
                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Título del evento *
                    </span>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Ej: Networking para Juniors - Barcelona"
                    />
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Descripción
                    </span>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Describe el evento, qué se hará, qué aprenderán los asistentes..."
                    />
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Fecha y hora *
                    </span>
                    <input
                        type="datetime-local"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Ubicación *
                    </span>
                    <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="Barcelona">Barcelona</option>
                        <option value="Madrid">Madrid</option>
                        <option value="Valencia">Valencia</option>
                        <option value="Sevilla">Sevilla</option>
                        <option value="Online">Online</option>
                        <option value="España">España (General)</option>
                    </select>
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Tipo de evento *
                    </span>
                    <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="NETWORKING">Networking</option>
                        <option value="WORKSHOP">Workshop</option>
                        <option value="TALK">Charla</option>
                        <option value="COFFEE_CHAT">Coffee Chat</option>
                    </select>
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Nivel *
                    </span>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                        <option value="JUNIOR_FRIENDLY">Junior Friendly</option>
                        <option value="ALL_LEVELS">Todos los niveles</option>
                    </select>
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Etiquetas
                    </span>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Ej: #networking,#junior,#barcelona,#IA"
                    />
                    <span className="block mt-1 text-sm text-gray-500">
                        Separa las etiquetas con comas
                    </span>
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        URL del evento original
                    </span>
                    <input
                        type="url"
                        name="sourceUrl"
                        value={formData.sourceUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="https://meetup.com/evento..."
                    />
                    <span className="block mt-1 text-sm text-gray-500">
                        Si el evento proviene de Meetup, Eventbrite, etc.
                    </span>
                    </label>

                    <label className="block">
                    <span className="block mb-1 font-medium text-gray-700">
                        Nombre del organizador
                    </span>
                    <input
                        type="text"
                        name="organizerName"
                        value={formData.organizerName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Nexus Team"
                    />
                    </label>
                </section>

                <footer className="flex gap-4 mt-8">
                    <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {loading ? 'Creando evento...' : 'Crear evento'}
                    </button>
                    <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    disabled={loading}
                    className="px-6 py-3 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                    Cancelar
                    </button>
                </footer>
                </fieldset>
            </form>
            </section>
        </main>
        </>
    );
    }

    export default CreateEvent;