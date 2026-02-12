import React from 'react';
import Toast from './Toast';

function ToastContainer({ toasts, removeToast }) {
    if (toasts.length === 0) return null;

    return (
        <section
            className="fixed z-50 w-full max-w-sm space-y-3 pointer-events-none top-4 right-4"
            aria-live="polite"
            aria-atomic="true"
        >
            <section className="pointer-events-auto">
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