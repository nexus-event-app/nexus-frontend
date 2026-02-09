import React from 'react';
import AdminHeader from '../components/layout/AdminHeader';
import TestimonialListItem from '../components/testimonials/TestimonialListItem';
import { useTestimonialAdmin } from '../hooks/useTestimonialAdmin';

function ManageTestimonials() {
    const {
        testimonials,
        loading,
        handleToggleHighlight,
        handleToggleActive,
        handleDelete
    } = useTestimonialAdmin();

    const activeCount = testimonials.filter(t => t.isActive).length;
    const highlightedCount = testimonials.filter(t => t.isHighlighted).length;

    return (
        <>
            <AdminHeader
                showBackButton={true}
                backTo="/dashboard"
                backLabel="Dashboard"
            />

            <main className="min-h-screen px-4 py-8 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-8">
                <section className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        Gestionar Testimonios
                    </h2>
                    <p className="text-gray-600">
                        Modera y gestiona los testimonios de la comunidad
                    </p>
                </section>

                <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
                    <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h3 className="mb-2 text-sm font-medium text-gray-600">
                            Total Testimonios
                        </h3>
                        <p className="text-3xl font-bold text-indigo-600">
                            {loading ? '...' : testimonials.length}
                        </p>
                    </article>

                    <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h3 className="mb-2 text-sm font-medium text-gray-600">
                            Públicos
                        </h3>
                        <p className="text-3xl font-bold text-green-600">
                            {loading ? '...' : activeCount}
                        </p>
                    </article>

                    <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h3 className="mb-2 text-sm font-medium text-gray-600">
                            Destacados
                        </h3>
                        <p className="text-3xl font-bold text-yellow-600">
                            {loading ? '...' : highlightedCount}
                        </p>
                    </article>
                </section>

                <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                        Todos los testimonios
                    </h3>

                    {loading ? (
                        <p className="text-gray-600">Cargando testimonios...</p>
                    ) : testimonials.length === 0 ? (
                        <p className="text-gray-600">
                            No hay testimonios todavía.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {testimonials.map(testimonial => (
                                <TestimonialListItem
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    onToggleHighlight={handleToggleHighlight}
                                    onToggleActive={handleToggleActive}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </ul>
                    )}
                </section>

                <section className="p-6 mt-8 border border-blue-100 bg-blue-50 rounded-xl">
                    <h3 className="mb-3 text-lg font-bold text-gray-900">
                        💡 Guía rápida
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>
                            <strong>⭐ Destacar:</strong> Los testimonios destacados aparecen primero en la home
                        </li>
                        <li>
                            <strong>✓ Activo/Oculto:</strong> Controla qué testimonios son visibles públicamente
                        </li>
                        <li>
                            <strong>🗑️ Eliminar:</strong> Elimina testimonios inapropiados o spam permanentemente
                        </li>
                        <li>
                            <strong>🛡️ Anti-spam:</strong> Los usuarios solo pueden enviar 1 testimonio cada 24h
                        </li>
                    </ul>
                </section>
            </main>
        </>
    );
}

export default ManageTestimonials;