import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuickActionsCard() {
    const navigate = useNavigate();

    return (
        <section className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
                Acciones Rápidas
            </h2>
            <menu className="flex flex-wrap gap-4 p-0 m-0 list-none">
                <li>
                    <button
                        onClick={() => navigate('/events/create')}
                        className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                        Crear Evento
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => navigate('/dashboard/news')}
                        className="px-6 py-3 font-medium text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                        Gestionar Noticias
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => navigate('/dashboard/testimonials')}
                        className="px-6 py-3 font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                    >
                        Gestionar Testimonios
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                        Ver Página Pública
                    </button>
                </li>
            </menu>
        </section>
    );
}

export default QuickActionsCard;