import React, { useState } from 'react';
import DeleteConfirmModal from '../common/DeleteConfirmModal';

function TestimonialListItem({
    testimonial,
    onToggleHighlight,
    onToggleActive,
    onDelete
}) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDeleteConfirm = async () => {
        try {
            setDeleting(true);
            await onDelete(testimonial.id);
            setShowDeleteModal(false);
        } catch (error) {
            setShowDeleteModal(false);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <li className="p-4 transition border border-gray-200 rounded-lg hover:bg-gray-50">
                <article>
                    <header className="flex items-start justify-between mb-3">
                        <section className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900">
                                {testimonial.name}
                            </h4>
                            {testimonial.role && (
                                <p className="text-sm text-gray-600">
                                    {testimonial.role}
                                </p>
                            )}
                            {testimonial.location && (
                                <p className="text-sm text-gray-500">
                                    📍 {testimonial.location}
                                </p>
                            )}
                        </section>

                        <menu className="flex gap-2 p-0 m-0 list-none">
                            <li>
                                <button
                                    onClick={() => onToggleHighlight(testimonial.id, testimonial.isHighlighted)}
                                    className={`px-3 py-1 text-sm transition rounded ${
                                        testimonial.isHighlighted
                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                    title={testimonial.isHighlighted ? 'Quitar destacado' : 'Destacar'}
                                >
                                    {testimonial.isHighlighted ? '⭐ Destacado' : '☆ Destacar'}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => onToggleActive(testimonial.id, testimonial.isActive)}
                                    className={`px-3 py-1 text-sm transition rounded ${
                                        testimonial.isActive
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                    }`}
                                >
                                    {testimonial.isActive ? '✓ Activo' : '✗ Oculto'}
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    disabled={deleting}
                                    className="px-3 py-1 text-sm text-red-600 transition rounded hover:bg-red-50 disabled:opacity-50"
                                >
                                    {deleting ? 'Eliminando...' : 'Eliminar'}
                                </button>
                            </li>
                        </menu>
                    </header>

                    <p className="mb-4 text-gray-700">
                        "{testimonial.content}"
                    </p>

                    <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                        <section>
                            <dt className="text-gray-500">Creado:</dt>
                            <dd className="font-medium">{formatDate(testimonial.createdAt)}</dd>
                        </section>
                        <section>
                            <dt className="text-gray-500">Caracteres:</dt>
                            <dd className="font-medium">{testimonial.content.length}/300</dd>
                        </section>
                        <section>
                            <dt className="text-gray-500">Estado:</dt>
                            <dd className={`font-medium ${testimonial.isActive ? 'text-green-600' : 'text-red-600'}`}>
                                {testimonial.isActive ? 'Público' : 'Oculto'}
                            </dd>
                        </section>
                    </dl>
                </article>
            </li>

            {showDeleteModal && (
                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteConfirm}
                    loading={deleting}
                    type="testimonio"
                />
            )}
        </>
    );
}

export default TestimonialListItem;