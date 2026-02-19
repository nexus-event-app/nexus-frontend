    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#3E54A3] to-[#3E54A3]/70">
        <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
            
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
            Conectando juniors con oportunidades tech
            </h1>

            <p className="mb-10 text-lg text-indigo-100 sm:text-xl">
            No estás solo en tu búsqueda. Nexus reúne eventos, recursos y una comunidad de developers junior que entienden tu camino.
            </p>

            <section className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            
            <button
                onClick={() => navigate('/eventos')}
                className="w-full px-8 py-3 text-lg font-medium text-[#4D48DC] transition bg-white rounded-lg sm:w-auto hover:bg-gray-50"
            >
                Explorar eventos
            </button>

            <a
                href="#testimonios"
                className="w-full px-8 py-3 text-lg font-medium text-center text-white transition border-2 border-white rounded-lg sm:w-auto hover:bg-white hover:text-indigo-600"
            >
                Conoce historias
            </a>

            </section>

        </article>
        </section>
    );
    }

    export default HeroSection;
