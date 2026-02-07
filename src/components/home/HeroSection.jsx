    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-5xl font-bold text-white">
            Conectando juniors con oportunidades tech
            </h2>

            <p className="mb-8 text-xl text-indigo-100">
            No estás solo en tu búsqueda. Nexus reúne eventos, recursos y una comunidad de developers junior que entienden tu camino.
            </p>

            <ul className="flex justify-center gap-4 p-0 m-0 list-none">
            <li>
                <button
                onClick={() => navigate('/eventos')}
                className="px-8 py-3 text-lg font-medium text-indigo-600 transition bg-white rounded-lg hover:bg-gray-50"
                >
                Explorar eventos
                </button>
            </li>

            <li>
                <a
                href="#testimonios"
                className="px-8 py-3 text-lg font-medium text-white transition border-2 border-white rounded-lg hover:bg-white hover:text-indigo-600"
                >
                Conoce historias
                </a>
            </li>
            </ul>
        </article>
        </section>
    );
    }

    export default HeroSection;
