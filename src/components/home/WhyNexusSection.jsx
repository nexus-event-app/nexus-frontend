import React from 'react';
import ImageCarousel from '../common/ImageCarousel';
import { whyNexusImages } from '../../data/carouselData';

function WhyNexusSection() {
    return (
<section className="py-16 mb-5 bg-gradient-to-br from-white via-indigo-50/60 to-purple-5mb-8">
    <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                ¿Por qué <span className="text-transparent bg-[#4C4AD6] bg-clip-text">StartDev</span>?
            </h2>
            <p className="max-w-3xl mx-auto mb-4 text-lg text-gray-800">
                Sabemos lo difícil que es empezar. Por eso creamos un espacio donde los juniors son protagonistas.
                Aquí encontrarás eventos presenciales para conectar, recursos actualizados sin ruido, y una comunidad
                que entiende tus dudas. No estás solo en este camino. StartDev es tu red de apoyo tech.
            </p>
        </header>
                <section className="overflow-hidden border-2 border-gray-200 rounded-2xl">
            <ImageCarousel
                images={whyNexusImages}
                autoPlay={false}
                height="h-96"
            />
        </section>

        <section className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-3">

            <article className="flex flex-col h-full">
                <section className="text-center">
                    <span className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#5B6DB0]">
                        <span className="text-4xl" aria-hidden="true">🤝</span>
                    </span>

                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                        Comunidad real
                    </h3>
                    <p className="text-base text-gray-600">
                        Conecta con otros juniors que están en tu misma situación. Comparte dudas, logros y experiencias.
                    </p>
                </section>
            </article>

            <article className="flex flex-col h-full">
                <section className="text-center">
                    <span className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#5B6DB0]">
                        <span className="text-4xl" aria-hidden="true">🎯</span>
                    </span>

                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                        Eventos
                    </h3>
                    <p className="text-base text-gray-600">
                        Solo eventos realmente útiles para juniors: networking, workshops y charlas sin requisitos inalcanzables.
                    </p>
                </section>
            </article>

            <article className="flex flex-col h-full">
                <section className="text-center">
                    <span className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#5B6DB0]">
                        <span className="text-4xl" aria-hidden="true">📚</span>
                    </span>

                    <h3 className="mb-4 text-2xl font-bold text-gray-900">
                        Recursos útiles
                    </h3>
                    <p className="text-base text-gray-600">
                        Noticias tech relevantes, guías y consejos pensados específicamente para developers que empiezan.
                    </p>
                </section>
            </article>

        </section>

    </article>
</section>

    );
}

export default WhyNexusSection;
