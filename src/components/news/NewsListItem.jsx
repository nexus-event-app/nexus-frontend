import React from 'react';

function NewsListItem({ item, onEdit, onDelete }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <li className="p-4 transition border border-gray-200 rounded-lg hover:bg-gray-50">
            <article>
                <header className="flex items-start justify-between mb-2">
                    <section className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900">
                            {item.title}
                        </h4>
                        {item.author && (
                            <p className="text-sm text-gray-500">
                                Por {item.author}
                            </p>
                        )}
                    </section>
                    <menu className="flex gap-2 p-0 m-0 list-none">
                        <li>
                            <button
                                onClick={() => onEdit(item)}
                                className="px-3 py-1 text-sm text-indigo-600 transition rounded hover:bg-indigo-50"
                            >
                                Editar
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="px-3 py-1 text-sm text-red-600 transition rounded hover:bg-red-50"
                            >
                                Eliminar
                            </button>
                        </li>
                    </menu>
                </header>

                {item.content && (
                    <p className="mb-3 text-gray-600 line-clamp-2">
                        {item.content}
                    </p>
                )}

                <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                    <section>
                        <dt className="text-gray-500">Creada:</dt>
                        <dd className="font-medium">{formatDate(item.createdAt)}</dd>
                    </section>
                    <section>
                        <dt className="text-gray-500">Estado:</dt>
                        <dd className={`font-medium ${item.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {item.isActive ? 'Activa' : 'Inactiva'}
                        </dd>
                    </section>
                    {item.sourceUrl && (
                        <section>
                            <dt className="text-gray-500">Fuente:</dt>
                            <dd>
                                <a
                                    href={item.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline"
                                >
                                    Ver enlace →
                                </a>
                            </dd>
                        </section>
                    )}
                </dl>
            </article>
        </li>
    );
}

export default NewsListItem;