import React, { useState } from 'react';
import { getCategoryLabel } from '../../utils/forumHelpers';

function EditDiscussionModal({ discussion, onClose, onSave, saving }) {
    const [formData, setFormData] = useState({
        title: discussion.title,
        content: discussion.content,
        category: discussion.category
    });

    const [errors, setErrors] = useState({});

    const categories = [
        'AYUDA_TECNICA',
        'RECURSOS',
        'EXPERIENCIAS',
        'NETWORKING',
        'GENERAL'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Limpiar error del campo
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'El título es obligatorio';
        } else if (formData.title.length < 5) {
            newErrors.title = 'El título debe tener al menos 5 caracteres';
        } else if (formData.title.length > 200) {
            newErrors.title = 'El título no puede superar los 200 caracteres';
        }

        if (!formData.content.trim()) {
            newErrors.content = 'El contenido es obligatorio';
        } else if (formData.content.length < 10) {
            newErrors.content = 'El contenido debe tener al menos 10 caracteres';
        }

        if (!formData.category) {
            newErrors.category = 'La categoría es obligatoria';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        onSave(formData);
    };

    return (
        <section
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            onClick={onClose}
            aria-labelledby="edit-modal-title"
            role="dialog"
            aria-modal="true"
        >
            <article
                className="w-full max-w-2xl p-6 bg-white shadow-2xl sm:p-8 rounded-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="mb-6">
                    <h2 id="edit-modal-title" className="text-2xl font-bold text-gray-900">
                        ✏️ Editar discusión
                    </h2>
                </header>

                <form onSubmit={handleSubmit}>
                    <section className="mb-6">
                        <label htmlFor="edit-title" className="block mb-2 text-sm font-semibold text-gray-700">
                            Título *
                        </label>
                        <input
                            type="text"
                            id="edit-title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg transition focus:outline-none focus:ring-4 ${errors.title
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-600'
                                }`}
                            placeholder="Título de tu discusión"
                        />
                        {errors.title && (
                            <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                        )}
                    </section>

                    <section className="mb-6">
                        <label htmlFor="edit-category" className="block mb-2 text-sm font-semibold text-gray-700">
                            Categoría *
                        </label>
                        <select
                            id="edit-category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg transition focus:outline-none focus:ring-4 ${errors.category
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-600'
                                }`}
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {getCategoryLabel(cat)}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                        )}
                    </section>

                    <section className="mb-6">
                        <label htmlFor="edit-content" className="block mb-2 text-sm font-semibold text-gray-700">
                            Contenido *
                        </label>
                        <textarea
                            id="edit-content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows="8"
                            className={`w-full px-4 py-3 border-2 rounded-lg transition focus:outline-none focus:ring-4 resize-none ${errors.content
                                    ? 'border-red-500 focus:ring-red-200'
                                    : 'border-gray-300 focus:ring-indigo-200 focus:border-indigo-600'
                                }`}
                            placeholder="Describe tu pregunta o tema..."
                        />
                        {errors.content && (
                            <p className="mt-2 text-sm text-red-600">{errors.content}</p>
                        )}
                    </section>

                    <footer className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="px-6 py-3 font-semibold text-gray-700 transition border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-3 font-semibold text-white transition rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-indigo-300"
                        >
                            {saving ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </footer>
                </form>
            </article>
        </section>
    );
}

export default EditDiscussionModal;