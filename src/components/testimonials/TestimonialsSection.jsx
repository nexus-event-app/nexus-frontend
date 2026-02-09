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
        error,
        success,
        handleChange,
        handleSubmit,
        resetForm
    } = useTestimonialForm(() => {
        reloadTestimonials();
        setShowForm(false);
        resetForm();
    });

    const onSubmit = (e) => {
        handleSubmit(e);
    };

    return (
        <section id="testimonios" className="py-16 bg-gray-50">
            <article className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <header className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">
                        Historias de la comunidad
                    </h2>
                    <p className="text-gray-600">
                        Juniors como tú comparten sus experiencias
                    </p>
                </header>

                {!showForm && (
                    <section className="mb-8 text-center">
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        >
                            ✍️ Compartir mi experiencia
                        </button>
                    </section>
                )}

                {showForm && (
                    <section className="max-w-2xl mx-auto mb-12">
                        <TestimonialForm
                            formData={formData}
                            onChange={handleChange}
                            onSubmit={onSubmit}
                            loading={formLoading}
                            error={error}
                            success={success}
                        />
                        <button
                            onClick={() => {
                                setShowForm(false);
                                resetForm();
                            }}
                            className="block mx-auto mt-4 text-sm text-gray-600 hover:text-gray-900"
                        >
                            Cancelar
                        </button>
                    </section>
                )}

                {loading ? (
                    <p className="text-center text-gray-600">Cargando testimonios...</p>
                ) : displayedTestimonials.length === 0 ? (
                    <section className="p-12 text-center bg-white border border-gray-200 rounded-xl">
                        <p className="text-gray-600">
                            Sé el primero en compartir tu experiencia
                        </p>
                    </section>
                ) : (
                    <>
                        <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
                            {displayedTestimonials.map(testimonial => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                />
                            ))}
                        </section>

                        {hasMore && (
                            <footer className="text-center">
                                <button
                                    onClick={loadMore}
                                    className="px-8 py-3 font-medium text-indigo-600 transition bg-white border-2 border-indigo-600 rounded-lg hover:bg-indigo-50"
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