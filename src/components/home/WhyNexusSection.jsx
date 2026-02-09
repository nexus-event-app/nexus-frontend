import React from 'react';
import ImageCarousel from '../common/ImageCarousel';
import { whyNexusImages } from '../../data/carouselData';

function WhyNexusSection() {
    return (
        <section className="py-16 bg-white">
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">
                        ¿Por qué Nexus?
                    </h2>
                    <p className="max-w-3xl mx-auto mb-6 text-lg text-gray-600">
                        Sabemos lo difícil que es empezar. Por eso creamos un espacio donde los juniors son protagonistas.
                        Aquí encontrarás eventos presenciales para conectar, recursos actualizados sin ruido, y una comunidad
                        que entiende tus dudas. No estás solo en este camino. Nexus es tu red de apoyo tech.
                    </p>
                </header>

                <section className="mb-12">
                    <ImageCarousel
                        images={whyNexusImages}
                        autoPlay={true}
                        interval={5000}
                        height="h-96"
                    />
                </section>

                <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <article className="p-6 text-center">
                        <span className="block mb-4 text-5xl" aria-hidden="true">🎯</span>
                        <h3 className="mb-3 text-xl font-bold text-gray-900">
                            Eventos curados
                        </h3>
                        <p className="text-gray-600">
                            Solo eventos realmente útiles para juniors: networking, workshops y charlas sin requisitos inalcanzables.
                        </p>
                    </article>

                    <article className="p-6 text-center">
                        <span className="block mb-4 text-5xl" aria-hidden="true">🤝</span>
                        <h3 className="mb-3 text-xl font-bold text-gray-900">
                            Comunidad real
                        </h3>
                        <p className="text-gray-600">
                            Conecta con otros juniors que están en tu misma situación. Comparte dudas, logros y experiencias.
                        </p>
                    </article>

                    <article className="p-6 text-center">
                        <span className="block mb-4 text-5xl" aria-hidden="true">📚</span>
                        <h3 className="mb-3 text-xl font-bold text-gray-900">
                            Recursos útiles
                        </h3>
                        <p className="text-gray-600">
                            Noticias tech relevantes, guías y consejos pensados específicamente para developers que empiezan.
                        </p>
                    </article>
                </section>
            </article>
        </section>
    );
}

export default WhyNexusSection;
