import React from 'react';
import FormField from '../common/FormField';

function TestimonialForm({
    formData,
    onChange,
    onSubmit,
    loading
}) {
    const charCount = formData.content.length;
    const isValid = charCount >= 50 && charCount <= 300;

    return (
        <form onSubmit={onSubmit} className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl" noValidate>
            <h3 className="mb-4 text-xl font-bold text-gray-900">
                Comparte tu experiencia
            </h3>
            <p className="mb-6 text-sm text-gray-600">
                Cuéntanos cómo Nexus te ha ayudado en tu carrera tech
            </p>

            <section className="space-y-4">
                <FormField
                    label="Tu nombre"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="Ej: María González"
                />

                <FormField
                    label="Tu rol (opcional)"
                    name="role"
                    value={formData.role}
                    onChange={onChange}
                    placeholder="Ej: Junior Frontend Developer"
                />

                <FormField
                    label="Ciudad (opcional)"
                    name="location"
                    value={formData.location}
                    onChange={onChange}
                    placeholder="Ej: Barcelona"
                />

                <section>
                    <FormField
                        label="Tu testimonio"
                        name="content"
                        type="textarea"
                        value={formData.content}
                        onChange={onChange}
                        rows={4}
                        placeholder="Comparte tu experiencia con la comunidad Nexus..."
                    />
                    <p className={`mt-1 text-xs text-right ${
                        charCount < 50 ? 'text-red-500' :
                        charCount > 300 ? 'text-red-500' :
                        'text-gray-500'
                    }`}>
                        {charCount}/300 caracteres {charCount < 50 && `(mínimo 50)`}
                    </p>
                </section>

                <button
                    type="submit"
                    disabled={loading || !isValid}
                    className="w-full px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Enviando...' : 'Publicar testimonio'}
                </button>

                <p className="text-xs text-center text-gray-500">
                    Solo puedes enviar un testimonio cada 24 horas
                </p>
            </section>
        </form>
    );
}

export default TestimonialForm;