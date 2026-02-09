import React from 'react';
import FormField from '../common/FormField';
import ImageUpload from '../common/ImageUpload';

function NewsForm({
    formData,
    onChange,
    onImageChange,
    onImageRemove,
    onSubmit,
    onCancel,
    loading,
    error,
    success,
    isEdit = false
}) {
    const categories = [
        { value: 'FRONTEND', label: 'Frontend' },
        { value: 'BACKEND', label: 'Backend' },
        { value: 'DEVOPS', label: 'DevOps' },
        { value: 'CARRERA', label: 'Carrera' },
        { value: 'RECURSOS', label: 'Recursos' },
        { value: 'HERRAMIENTAS', label: 'Herramientas' },
        { value: 'ENTREVISTAS', label: 'Entrevistas' },
        { value: 'GENERAL', label: 'General' }
    ];

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {error && (
                <p className="p-3 text-sm text-red-600 rounded-lg bg-red-50" role="alert">
                    {error}
                </p>
            )}

            {success && (
                <p className="p-3 text-sm text-green-600 rounded-lg bg-green-50" role="alert">
                    {success}
                </p>
            )}

            <FormField
                label="Título"
                name="title"
                value={formData.title}
                onChange={onChange}
                required
                placeholder="Ej: Los mejores recursos para aprender React"
            />

            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    Categoría *
                </span>
                <select
                    name="category"
                    value={formData.category}
                    onChange={onChange}
                    required
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
                label="Contenido"
                name="content"
                type="textarea"
                value={formData.content}
                onChange={onChange}
                rows={5}
                placeholder="Descripción de la noticia..."
            />

            <ImageUpload
                imageUrl={formData.imageUrl}
                onImageChange={onImageChange}
                onImageRemove={onImageRemove}
            />

            <FormField
                label="URL de la fuente"
                name="sourceUrl"
                type="url"
                value={formData.sourceUrl}
                onChange={onChange}
                placeholder="https://ejemplo.com/noticia"
            />

            <FormField
                label="Autor"
                name="author"
                value={formData.author}
                onChange={onChange}
                placeholder="Ej: Tech Blog"
            />

            {isEdit && (
                <FormField
                    label="Noticia activa (visible en la web)"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={onChange}
                />
            )}

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
                        className="w-full px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Guardando...' : isEdit ? 'Actualizar noticia' : 'Crear noticia'}
                    </button>
                </li>
            </menu>
        </form>
    );
}

export default NewsForm;