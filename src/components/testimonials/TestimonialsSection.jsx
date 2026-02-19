import React, { useState } from 'react';
import TestimonialCard from './TestimonialCard';
import TestimonialForm from './TestimonialForm';
import { useTestimonials } from '../../hooks/useTestimonials';
import { useTestimonialForm } from '../../hooks/useTestimonialForm';

function TestimonialsSection() {
    const [showForm, setShowForm] = useState(false);

    const {
        displayedTestimonials,
        loading,
        hasMore,
        loadMore,
        reloadTestimonials
    } = useTestimonials();

    const {
        formData,
        loading: formLoading,
        handleChange,
        handleSubmit,
        resetForm
    } = useTestimonialForm(() => {
        reloadTestimonials();
        setShowForm(false);
    });

    const onSubmit = (e) => {
        handleSubmit(e);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        resetForm();
    };

    const handleOpenForm = () => {
        setShowForm(true);
        resetForm();
    };

    return (
        <section
            id="testimonios"
            className="py-8 sm:py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-indigo-50"
            aria-labelledby="testimonials-heading"
        >
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-8 text-center sm:mb-10 lg:mb-12">
                    <h2
                        id="testimonials-heading"
                        className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
                    >
                        Historias de la comunidad
                    </h2>
                    <p className="px-4 mb-0 text-base text-gray-600 sm:text-lg">
                        Juniors como tú comparten sus experiencias
                    </p>
                </header>

                {!showForm && (
                    <section className="mt-0 text-center sm:mb-10" aria-label="Acciones de testimonios">
                        <button
                            onClick={handleOpenForm}
                            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all shadow-lg sm:px-8 sm:text-base rounded-xl bg-[#3F53A8] hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
                            aria-label="Abrir formulario para compartir experiencia"
                        >
                            <span className="mr-2" aria-hidden="true">▶</span>
                            <span>Compartir mi experiencia</span>
                        </button>
                    </section>
                )}

                {showForm && (
                    <section
                        className="max-w-2xl p-6 mx-auto mb-8 bg-white border-2 border-indigo-200 shadow-xl sm:p-8 sm:mb-12 rounded-2xl"
                        aria-label="Formulario de testimonio"
                    >
                        <TestimonialForm
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={onSubmit}
                            loading={formLoading}
                        />
                        <button
                            onClick={handleCancelForm}
                            className="block px-6 py-2 mx-auto mt-6 text-sm font-medium text-gray-700 transition border-2 border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            aria-label="Cancelar y cerrar formulario"
                        >
                            Cancelar
                        </button>
                    </section>
                )}

                {loading ? (
                    <p
                        className="py-8 text-center text-gray-600"
                        role="status"
                        aria-live="polite"
                    >
                        Cargando testimonios...
                    </p>
                ) : displayedTestimonials.length === 0 ? (
                    <section
                        className="relative p-8 overflow-hidden text-center transition-all duration-300 bg-white border-2 border-indigo-200 border-dashed sm:p-12 rounded-xl hover:border-indigo-400 hover:shadow-lg"
                        aria-label="Estado vacío de testimonios"
                    >
                        <section
                            className="absolute inset-0 opacity-5 bg-gradient-to-br from-indigo-100 to-purple-100"
                            aria-hidden="true"
                        ></section>

                        <section className="relative z-10">
                            <p className="mb-2 text-5xl sm:text-6xl" aria-hidden="true">🌟</p>
                            <h3 className="mb-3 text-lg font-bold text-gray-900 sm:text-xl">
                                Sé el primero en compartir tu historia
                            </h3>
                            <p className="px-4 mb-6 text-sm text-gray-600 sm:text-base">
                                ¿Conseguiste tu primer trabajo? ¿Superaste un reto? ¡Cuéntanos!
                            </p>

                            <ul
                                className="flex flex-col flex-wrap justify-center gap-3 px-4 sm:flex-row"
                                aria-label="Ejemplos de historias que puedes compartir"
                            >
                                <li className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition bg-white border-2 border-indigo-100 rounded-lg">
                                    <span className="text-xl" aria-hidden="true">🚀</span>
                                    <span className="text-gray-700">Primer empleo tech</span>
                                </li>
                                <li className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition bg-white border-2 border-purple-100 rounded-lg">
                                    <span className="text-xl" aria-hidden="true">💪</span>
                                    <span className="text-gray-700">Superé el síndrome del impostor</span>
                                </li>
                                <li className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition bg-white border-2 border-pink-100 rounded-lg">
                                    <span className="text-xl" aria-hidden="true">🎓</span>
                                    <span className="text-gray-700">Cambio de carrera exitoso</span>
                                </li>
                            </ul>
                        </section>
                    </section>
                ) : (
                    <>
                        <ul
                            className="grid grid-cols-1 gap-4 mb-8 sm:gap-6 lg:gap-8 sm:mb-10 lg:mb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            aria-label="Lista de testimonios de la comunidad"
                        >
                            {displayedTestimonials.map(testimonial => (
                                <li key={testimonial.id} className="min-w-0">
                                    <TestimonialCard testimonial={testimonial} />
                                </li>
                            ))}

                        </ul>

                        {hasMore && (
                            <footer className="text-center">
                                <button
                                    onClick={loadMore}
                                    className="inline-flex items-center px-6 py-3 text-sm font-semibold text-indigo-600 transition-all bg-white border-2 border-indigo-600 sm:px-8 sm:text-base rounded-xl hover:bg-indigo-50 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2"
                                    aria-label="Cargar más testimonios de la comunidad"
                                >
                                    Ver más testimonios 
                                </button>
                            </footer>
                        )}
                    </>
                )}
            </article>
        </section>
    );
}

export default TestimonialsSection;