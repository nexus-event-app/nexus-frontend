import React from 'react';

function EventForm({ formData, onChange, onSubmit, onCancel, loading, isEdit = false }) {
    return (
        <form onSubmit={onSubmit} className="p-8 bg-white border border-gray-100 shadow-sm rounded-xl" noValidate>
            <fieldset disabled={loading}>
                <legend className="sr-only">
                    {isEdit ? 'Formulario de edición de evento' : 'Formulario de creación de evento'}
                </legend>

                <section className="space-y-6">
                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Título del evento *
                        </span>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Ej: Networking para Juniors - Barcelona"
                        />
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Descripción *
                        </span>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Describe el evento, qué se hará, qué aprenderán los asistentes..."
                        />
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Fecha y hora *
                        </span>
                        <input
                            type="datetime-local"
                            name="eventDate"
                            value={formData.eventDate}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Ubicación *
                        </span>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="Barcelona">Barcelona</option>
                            <option value="Madrid">Madrid</option>
                            <option value="Valencia">Valencia</option>
                            <option value="Sevilla">Sevilla</option>
                            <option value="Online">Online</option>
                            <option value="España">España (General)</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Tipo de evento *
                        </span>
                        <select
                            name="eventType"
                            value={formData.eventType}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="NETWORKING">Networking</option>
                            <option value="WORKSHOP">Workshop</option>
                            <option value="TALK">Charla</option>
                            <option value="COFFEE_CHAT">Coffee Chat</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Nivel *
                        </span>
                        <select
                            name="level"
                            value={formData.level}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="JUNIOR_FRIENDLY">Junior Friendly</option>
                            <option value="ALL_LEVELS">Todos los niveles</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Etiquetas
                        </span>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Ej: #networking,#junior,#barcelona,#IA"
                        />
                        <span className="block mt-1 text-sm text-gray-500">
                            Separa las etiquetas con comas
                        </span>
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            URL del evento original
                        </span>
                        <input
                            type="url"
                            name="sourceUrl"
                            value={formData.sourceUrl}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="https://meetup.com/evento..."
                        />
                        <span className="block mt-1 text-sm text-gray-500">
                            Si el evento proviene de Meetup, Eventbrite, etc.
                        </span>
                    </label>

                    <label className="block">
                        <span className="block mb-1 font-medium text-gray-700">
                            Nombre del organizador
                        </span>
                        <input
                            type="text"
                            name="organizerName"
                            value={formData.organizerName}
                            onChange={onChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="Nexus Team"
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
                            <span className="font-medium text-gray-700">
                                Evento activo
                            </span>
                        </label>
                    )}
                </section>

                <footer className="flex gap-4 mt-8">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading
                            ? (isEdit ? 'Guardando cambios...' : 'Creando evento...')
                            : (isEdit ? 'Guardar cambios' : 'Crear evento')
                        }
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="px-6 py-3 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                </footer>
            </fieldset>
        </form>
    );
}

export default EventForm;