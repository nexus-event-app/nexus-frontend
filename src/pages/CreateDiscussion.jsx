import React from 'react';
import Layout from '../components/layout/Layout';
import DiscussionForm from '../components/forum/DiscussionForm';
import { useCreateDiscussion } from '../hooks/useCreateDiscussion';

function CreateDiscussion() {
    const {
        formData,
        loading,
        error,
        handleChange,
        handleSubmit,
        handleCancel
    } = useCreateDiscussion();

    return (
        <Layout>
            <header className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#3E54A3] to-[#3E54A3]/70 mb-8">
                <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                        Crear Nueva Discusión
                    </h2>
                    <p className="text-lg text-indigo-100 sm:text-xl">
                        Comparte tus dudas, experiencias o recursos con la comunidad
                    </p>
                </article>
            </header>

            <main className="container max-w-3xl px-4 pb-8 mx-auto sm:px-6 lg:px-8">
                <section className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <DiscussionForm
                        formData={formData}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        loading={loading}
                        error={error}
                    />
                </section>
            </main>
        </Layout>
    );
}

export default CreateDiscussion;