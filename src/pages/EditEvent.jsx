    import React from 'react';
    import { useParams } from 'react-router-dom';
    import EventForm from '../components/events/EventForm';
    import AdminHeader from '../components/layout/AdminHeader';
    import { useEventForm } from '../hooks/useEventForm';

    function EditEvent() {
    const { id } = useParams();
    const {
        formData,
        loading,
        saving,
        error,
        success,
        handleChange,
        handleSubmit,
        handleCancel
    } = useEventForm(id);

    if (loading) {
        return (
        <>
            <AdminHeader showBackButton={true} />
            <main className="flex items-center justify-center min-h-screen bg-gray-50">
            <p className="text-gray-600">Cargando evento...</p>
            </main>
        </>
        );
    }

    return (
        <>
        <AdminHeader showBackButton={true} />

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