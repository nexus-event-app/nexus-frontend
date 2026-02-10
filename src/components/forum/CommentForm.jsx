import React from 'react';

function CommentForm({ value, onChange, onSubmit, loading, error, isLoggedIn }) {
    if (!isLoggedIn) {
        return (
            <section className="p-6 text-center border border-gray-200 rounded-lg bg-gray-50">
                <p className="mb-4 text-gray-600">
                    Inicia sesión para participar en la discusión
                </p>

                <a
                    href="/login"
                    className="inline-block px-6 py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                    Iniciar sesión
                </a>
            </section>
        );
    }

    return (
        <form onSubmit={onSubmit} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
                Añadir respuesta
            </h3>

            {error && (
                <p
                    className="p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50"
                    role="alert"
                >
                    {error}
                </p>
            )}

            <label className="block mb-4">
                <span className="block mb-2 font-medium text-gray-700">
                    Tu respuesta
                </span>
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={4}
                    placeholder="Comparte tu conocimiento, experiencia o consejo..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                />
            </label>

            <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Publicando...' : 'Publicar respuesta'}
            </button>
        </form>
    );
}

export default CommentForm;
