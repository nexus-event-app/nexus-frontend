import React from 'react';

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

            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    Título *
                </span>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Ej: GitHub Copilot gratis para estudiantes"
                />
            </label>

            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    Contenido
                </span>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={onChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Descripción de la noticia..."
                />
            </label>

            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    URL de la fuente
                </span>
                <input
                    type="url"
                    name="sourceUrl"
                    value={formData.sourceUrl}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/noticia"
                />
            </label>

            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    URL de la imagen
                </span>
                <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/imagen.jpg"
                />
            </label>

            <label className="block">
                <span className="block mb-1 font-medium text-gray-700">
                    Autor
                </span>
                <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={onChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Ej: GitHub Blog"
                />
            </label>

            {isEdit && (
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={onChange}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                        Noticia activa (visible en la web)
                    </span>
                </label>
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