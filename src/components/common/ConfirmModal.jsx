import React from 'react';
import Modal from './Modal';

function ConfirmModal({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar', 
    danger = false,
    loading = false
}) {
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" showCloseButton={false}>
            <p className="mb-6 text-gray-700">{message}</p>
            
            <footer className="flex flex-col gap-3 sm:flex-row">
                <button
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-4 py-2 font-semibold text-gray-700 transition border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-200"
                >
                    {cancelText}
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className={`flex-1 px-4 py-2 font-semibold text-white transition rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 ${
                        danger 
                            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-300' 
                            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300'
                    }`}
                >
                    {loading ? 'Procesando...' : confirmText}
                </button>
            </footer>
        </Modal>
    );
}

export default ConfirmModal;