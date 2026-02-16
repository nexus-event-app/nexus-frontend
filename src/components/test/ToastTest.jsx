import React from 'react';
import { useToastContext } from '../../context/ToastContext';


function ToastTest() {
    const { showSuccess, showError, showWarning, showInfo } = useToastContext();

    return (
        <section className="fixed z-50 flex gap-2 p-4 bg-white border-2 border-gray-300 rounded-lg shadow-lg bottom-4 left-4">
            <button
                onClick={() => showSuccess('✓ Operación exitosa')}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
                Success
            </button>
            <button
                onClick={() => showError('✕ Error al procesar')}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
                Error
            </button>
            <button
                onClick={() => showWarning('⚠ Advertencia importante')}
                className="px-4 py-2 text-white bg-yellow-600 rounded-lg hover:bg-yellow-700"
            >
                Warning
            </button>
            <button
                onClick={() => showInfo('ℹ Información útil')}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
                Info
            </button>
        </section>
    );
}

export default ToastTest;