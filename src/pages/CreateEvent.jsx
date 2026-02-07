    import React from 'react';
    import EventForm from '../components/events/EventForm';
    import AdminHeader from '../components/layout/AdminHeader';
    import { useEventForm } from '../hooks/useEventForm';

    function CreateEvent() {
    const {
        formData,
        saving,
        error,
        success,
        handleChange,
        handleSubmit,
        handleCancel
    } = useEventForm();

    return (
        <>
        <AdminHeader showBackButton={true} />

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
                loading={saving}
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