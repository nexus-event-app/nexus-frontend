import React from 'react';

function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    showCloseButton = true
}) {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl'
    };

    return (
        <section
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <article
                className={`w-full ${sizeClasses[size]} bg-white shadow-2xl rounded-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100`}
                onClick={(e) => e.stopPropagation()}
            >
                {(title || showCloseButton) && (
                    <header className="flex items-center justify-between p-6 border-b border-gray-100 sm:p-8">
                        {title && (
                            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 transition-all rounded-lg hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                aria-label="Cerrar modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </header>
                )}

                <section className="p-6 sm:p-8">
                    {children}
                </section>
            </article>
        </section>
    );
}

export default Modal;