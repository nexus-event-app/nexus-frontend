import React from 'react';
import FormField from '../common/FormField';

function NewsForm({
    formData,
    onChange,
    onSubmit,
    onCancel,
    loading,
    error,
    success,
    isEdit = false
}) {
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
                placeholder="Ej: GitHub Copilot gratis para estudiantes"
            />

            <FormField
                label="Contenido"
                name="content"
                type="textarea"
                value={formData.content}
                onChange={onChange}
                rows={5}
                placeholder="Descripción de la noticia..."
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
                label="URL de la imagen"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={onChange}
                placeholder="https://ejemplo.com/imagen.jpg"
            />

            <FormField
                label="Autor"
                name="author"
                value={formData.author}
                onChange={onChange}
                placeholder="Ej: GitHub Blog"
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