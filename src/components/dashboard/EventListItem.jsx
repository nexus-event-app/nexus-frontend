import React, { useState } from 'react';
import DeleteConfirmModal from '../common/DeleteConfirmModal';

function EventListItem({ event, onEdit, onDelete }) {
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
            await onDelete(event.id);
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
                    <header className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">
                            {event.title}
                        </h3>
                        <menu className="flex gap-2 p-0 m-0 list-none">
                            <li>
                                <button
                                    onClick={() => onEdit(event.id)}
                                    className="px-3 py-1 text-sm text-indigo-600 transition rounded hover:bg-indigo-50"
                                >
                                    Editar
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

                    <p className="mb-3 text-gray-600">
                        {event.description}
                    </p>

                    <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                        <dt className="text-gray-500">Fecha:</dt>
                        <dd className="font-medium">{formatDate(event.eventDate)}</dd>
                        <dt className="text-gray-500">Ubicación:</dt>
                        <dd className="font-medium">{event.location}</dd>
                        <dt className="text-gray-500">Tipo:</dt>
                        <dd className="font-medium">{event.eventType}</dd>
                        <dt className="text-gray-500">Nivel:</dt>
                        <dd className="font-medium">{event.level}</dd>
                    </dl>

                    {event.tags && (
                        <p className="mt-3 text-sm text-indigo-600">
                            {event.tags}
                        </p>
                    )}
                </article>
            </li>

            {showDeleteModal && (
                <DeleteConfirmModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteConfirm}
                    loading={deleting}
                    type="evento"
                />
            )}
        </>
    );
}

export default EventListItem;