import React from 'react';
import ImageCarousel from '../common/ImageCarousel';
import { whyNexusImages } from '../../data/carouselData';

function WhyNexusSection() {
    return (
        <section className="py-16 mb-8 bg-gradient-to-br from-white via-indigo-50/30 to-purple-5mb-8">
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        ¿Por qué <span className="text-transparent bg-gradient-to-r from-[#4C4AD6] to-purple-600 bg-clip-text">Nexus</span>?
                    </h2>
                    <p className="max-w-3xl mx-auto mb-6 text-lg text-gray-800">
                        Sabemos lo difícil que es empezar. Por eso creamos un espacio donde los juniors son protagonistas.
                        Aquí encontrarás eventos presenciales para conectar, recursos actualizados sin ruido, y una comunidad
                        que entiende tus dudas. No estás solo en este camino. Nexus es tu red de apoyo tech.
                    </p>
                </header>

                <section className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-3">


                    <article className="relative flex flex-col h-full p-8 overflow-hidden transition-all duration-500 bg-white border-2 border-gray-200 group rounded-2xl hover:shadow-2xl hover:border-[#4C4AD6] hover:-translate-y-2">
                        <span className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-[#4C4AD6]/5 to-purple-500/5 group-hover:opacity-100"></span>

                        <section className="relative z-10 text-center">
                            <span className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-500 rounded-2xl bg-gradient-to-br from-[#4C4AD6] to-purple-600 group-hover:scale-110 group-hover:rotate-6">
                                <span className="text-4xl" aria-hidden="true">🤝</span>
                                <span className="absolute inset-0 transition-all duration-500 rounded-2xl opacity-0 ring-4 ring-[#4C4AD6]/20 group-hover:opacity-100 group-hover:scale-125"></span>
                            </span>

                            <h3 className="mb-4 text-2xl font-bold transition-colors duration-300 text-gray-900 group-hover:text-[#4C4AD6]">
                                Comunidad real
                            </h3>
                            <p className="text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                                Conecta con otros juniors que están en tu misma situación. Comparte dudas, logros y experiencias.
                            </p>
                        </section>
                    </article>

                    <article className="relative flex flex-col h-full p-8 overflow-hidden transition-all duration-500 bg-white border-2 border-gray-200 group rounded-2xl hover:shadow-2xl hover:border-[#4C4AD6] hover:-translate-y-2">
                        <span className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-[#4C4AD6]/5 to-purple-500/5 group-hover:opacity-100"></span>

                        <section className="relative z-10 text-center">
                            <span className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-500 rounded-2xl bg-gradient-to-br from-[#4C4AD6] to-purple-600 group-hover:scale-110 group-hover:rotate-6">
                                <span className="text-4xl" aria-hidden="true">🎯</span>
                                <span className="absolute inset-0 transition-all duration-500 rounded-2xl opacity-0 ring-4 ring-[#4C4AD6]/20 group-hover:opacity-100 group-hover:scale-125"></span>
                            </span>

                            <h3 className="mb-4 text-2xl font-bold transition-colors duration-300 text-gray-900 group-hover:text-[#4C4AD6]">
                                Eventos
                            </h3>
                            <p className="text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                                Solo eventos realmente útiles para juniors: networking, workshops y charlas sin requisitos inalcanzables.
                            </p>
                        </section>
                    </article>

                    <article className="relative flex flex-col h-full p-8 overflow-hidden transition-all duration-500 bg-white border-2 border-gray-200 group rounded-2xl hover:shadow-2xl hover:border-[#4C4AD6] hover:-translate-y-2">
                        <span className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-[#4C4AD6]/5 to-purple-500/5 group-hover:opacity-100"></span>

                        <section className="relative z-10 text-center">
                            <span className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-6 transition-all duration-500 rounded-2xl bg-gradient-to-br from-[#4C4AD6] to-purple-600 group-hover:scale-110 group-hover:rotate-6">
                                <span className="text-4xl" aria-hidden="true">📚</span>
                                <span className="absolute inset-0 transition-all duration-500 rounded-2xl opacity-0 ring-4 ring-[#4C4AD6]/20 group-hover:opacity-100 group-hover:scale-125"></span>
                            </span>

                            <h3 className="mb-4 text-2xl font-bold transition-colors duration-300 text-gray-900 group-hover:text-[#4C4AD6]">
                                Recursos útiles
                            </h3>
                            <p className="text-base text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                                Noticias tech relevantes, guías y consejos pensados específicamente para developers que empiezan.
                            </p>
                        </section>
                    </article>
                </section>

                <section className="overflow-hidden border-2 border-gray-200 shadow-xl rounded-2xl">
                    <ImageCarousel
                        images={whyNexusImages}
                        autoPlay={true}
                        interval={5000}
                        height="h-96"
                    />
                </section>
            </article>
        </section>
    );
}

export default WhyNexusSection;
