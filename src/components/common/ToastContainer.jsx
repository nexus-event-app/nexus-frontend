import React from 'react';
import Toast from './Toast';

function ToastContainer({ toasts, removeToast }) {
    if (toasts.length === 0) return null;

    return (
        <section
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            aria-live="polite"
            aria-atomic="true"
        >
            <section className="flex flex-col items-center pointer-events-auto">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={removeToast}
                    />
                ))}
            </section>
        </section>
    );
}

export default ToastContainer;