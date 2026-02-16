import React from 'react';
import FormField from '../common/FormField';

function DiscussionForm({ formData, onChange, onSubmit, onCancel, loading }) {
    const categories = [
        { value: 'AYUDA_TECNICA', label: 'Ayuda Técnica' },
        { value: 'RECURSOS', label: 'Recursos' },
        { value: 'EXPERIENCIAS', label: 'Experiencias' },
        { value: 'NETWORKING', label: 'Networking' },
        { value: 'GENERAL', label: 'General' }
    ];

    return (
        <form onSubmit={onSubmit} className="space-y-6" noValidate>
            <FormField
                label="Título"
                name="title"
                value={formData.title}
                onChange={onChange}
                placeholder="Ej: ¿Cómo prepararse para una entrevista técnica?"
                maxLength={200}
            />

            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    Categoría *
                </span>
                <select
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                    {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </label>

            <FormField
                label="Descripción"
                name="content"
                type="textarea"
                value={formData.content}
                onChange={onChange}
                rows={8}
                placeholder="Explica tu duda o comparte tu experiencia..."
            />

            <menu className="flex gap-4 p-0 m-0 list-none">
                <li className="flex-1">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full px-6 py-3 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Cancelar
                    </button>
                </li>
                <li className="flex-1">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-6 py-3 font-medium text-white transition bg-[#4150B2] rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Publicando...' : 'Publicar discusión'}
                    </button>
                </li>
            </menu>
        </form>
    );
}

export default DiscussionForm;