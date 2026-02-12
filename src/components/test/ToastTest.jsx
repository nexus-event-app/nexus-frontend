import React from 'react';
import { useToastContext } from '../../context/ToastContext';

function ToastTest() {
    const { showSuccess, showError, showWarning, showInfo } = useToastContext();

    return (
        <section className="fixed z-50 space-x-2 bottom-4 left-4">
            <button
                onClick={() => showSuccess('¡Operación exitosa!')}
                className="px-4 py-2 text-white bg-green-600 rounded"
            >
                Success
            </button>
            <button
                onClick={() => showError('Error al realizar la operación')}
                className="px-4 py-2 text-white bg-red-600 rounded"
            >
                Error
            </button>
            <button
                onClick={() => showWarning('Atención: Esta es una advertencia')}
                className="px-4 py-2 text-white bg-yellow-600 rounded"
            >
                Warning
            </button>
            <button
                onClick={() => showInfo('Información importante')}
                className="px-4 py-2 text-white bg-blue-600 rounded"
            >
                Info
            </button>
        </section>
    );
}

export default ToastTest;