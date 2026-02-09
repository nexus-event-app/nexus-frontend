import React from 'react';

function TestimonialStatsCards({
    totalTestimonials,
    activeTestimonials,
    highlightedTestimonials,
    loading
}) {
    return (
        <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                    Total Testimonios
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                    {loading ? '...' : totalTestimonials}
                </p>
            </article>

            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                    Testimonios Públicos
                </h3>
                <p className="text-3xl font-bold text-green-600">
                    {loading ? '...' : activeTestimonials}
                </p>
            </article>

            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                    Testimonios Destacados
                </h3>
                <p className="text-3xl font-bold text-yellow-600">
                    {loading ? '...' : highlightedTestimonials}
                </p>
            </article>
        </section>
    );
}

export default TestimonialStatsCards;