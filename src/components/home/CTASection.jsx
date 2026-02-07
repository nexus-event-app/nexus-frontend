    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function CTASection() {
    const navigate = useNavigate();

    return (
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
            <h2 className="mb-6 text-4xl font-bold text-white">
            ¿Listo para dar el siguiente paso?
            </h2>
            <p className="mb-8 text-xl text-indigo-100">
            Únete a cientos de juniors que ya están conectando y creciendo en la comunidad tech
            </p>
            <button
            onClick={() => navigate('/eventos')}
            className="px-8 py-4 text-lg font-medium text-indigo-600 transition bg-white rounded-lg hover:bg-gray-50"
            >
            Explorar todos los eventos →
            </button>
        </article>
        </section>
    );
    }

    export default CTASection;