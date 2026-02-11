    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function CTASection() {
    const navigate = useNavigate();

    return (
<section className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#3E54A3] to-[#3E54A3]/90">
    <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-bold text-white sm:text-3xl">
            ¿Tienes una pregunta? ¡Este es tu espacio!
        </h2>
        <p className="mb-8 text-xl text-indigo-100 sm:text-xl">
            No te quedes con dudas. Nuestra comunidad está aquí para ayudarte a crecer como developer.
        </p>
        
        <section className="grid grid-cols-1 gap-4 mb-8 text-white sm:grid-cols-3">
            <aside className="p-4 transition-all duration-300 border-2 border-indigo-300 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:scale-105">
                <p className="text-3xl font-bold">🤔</p>
                <p className="mt-2 text-lg font-semibold">Pregunta sin miedo</p>
                <p className="mt-1 text-sm text-indigo-100">Todos empezamos desde cero</p>
            </aside>
            
            <aside className="p-4 transition-all duration-300 border-2 border-indigo-300 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:scale-105">
                <p className="text-3xl font-bold">💡</p>
                <p className="mt-2 text-lg font-semibold">Comparte tus experiencias</p>
                <p className="mt-1 text-sm text-indigo-100">Tu historia puede inspirar a otros</p>
            </aside>
            
            <aside className="p-4 transition-all duration-300 border-2 border-indigo-300 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:scale-105">
                <p className="text-3xl font-bold">🚀</p>
                <p className="mt-2 text-lg font-semibold">Ayuda a la comunidad</p>
                <p className="mt-1 text-sm text-indigo-100">Crecer juntos nos hace más fuertes</p>
            </aside>
        </section>

        <button
            onClick={() => navigate('/foro')}
            className="px-8 py-4 text-lg font-medium text-indigo-600 transition bg-white shadow-lg rounded-xl hover:bg-gray-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
        >
            Crear mi primera discusión →
        </button>
        
        <p className="mt-6 text-sm text-indigo-200">
            ¿Solo quieres leer? También puedes explorar las discusiones existentes
        </p>
    </article>
</section>
    );
    }

    export default CTASection;