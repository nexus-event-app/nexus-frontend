import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useToastContext } from '../../context/ToastContext';
import { getCategoryLabel } from '../../utils/forumHelpers';

function EditDiscussionModal({ discussion, onClose, onSave, saving }) {
    const { showError } = useToastContext();
    const [formData, setFormData] = useState({
        title: discussion.title,
        content: discussion.content,
        category: discussion.category
    });

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
    };

    const validate = () => {
        if (!formData.title.trim()) {
            showError('El título es obligatorio');
            return false;
        }

        if (formData.title.trim().length < 5) {
            showError('El título debe tener al menos 5 caracteres');
            return false;
        }

        if (formData.title.length > 200) {
            showError('El título no puede superar los 200 caracteres');
            return false;
        }

        if (!formData.content.trim()) {
            showError('El contenido es obligatorio');
            return false;
        }

        if (formData.content.trim().length < 10) {
            showError('El contenido debe tener al menos 10 caracteres');
            return false;
        }

        if (!formData.category) {
            showError('La categoría es obligatoria');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSave(formData);
    };

    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            title="✏️ Editar discusión"
            size="md"
        >
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
                        className="w-full px-4 py-3 transition border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600"
                        placeholder="Título de tu discusión"
                    />
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
                        className="w-full px-4 py-3 transition border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600"
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {getCategoryLabel(cat)}
                            </option>
                        ))}
                    </select>
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
                        className="w-full px-4 py-3 transition border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-600"
                        placeholder="Describe tu pregunta o tema..."
                    />
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
        </Modal>
    );
}

export default EditDiscussionModal;