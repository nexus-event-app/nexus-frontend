import React from 'react';
import ConfirmModal from './ConfirmModal';

function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    loading,
    type = 'elemento'
}) {
    return (
        <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title={`⚠️ Eliminar ${type}`}
            message={`¿Estás seguro de que quieres eliminar ${type === 'discusión' || type === 'comentario' ? 'este' : 'esta'} ${type}? Esta acción no se puede deshacer.`}
            confirmText="Sí, eliminar"
            cancelText="Cancelar"
            danger={true}
            loading={loading}
        />
    );
}

export default DeleteConfirmModal;