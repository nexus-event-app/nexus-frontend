import React from 'react';
import Layout from '../components/layout/Layout';
import { useDiscussions } from '../hooks/useDiscussions';
import DiscussionCard from '../components/forum/DiscussionCard';
import DiscussionCategoryFilter from '../components/forum/DiscussionCategoryFilter';
import CreateDiscussionButton from '../components/forum/CreateDiscussionButton';
import ForumRules from '../components/forum/ForumRules';
import Pagination from '../components/common/Pagination';

function Forum() {
    const {
        discussions,
        allDiscussions,
        loading,
        selectedCategory,
        currentPage,
        totalPages,
        handleCategoryChange,
        handlePageChange,
        reloadDiscussions
    } = useDiscussions();

    return (
        <Layout>
            <header className="py-20 bg-gradient-to-br from-[#4F46E5] via-[#3E54A3] to-[#3E54A3]/70 mb-6">
                <article className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
                        Foro de Discusión
                    </h2>
                    <p className="mb-6 text-lg text-indigo-100 sm:text-xl">
                        Comparte dudas, experiencias y recursos con otros juniors
                    </p>
                    <CreateDiscussionButton />
                </article>
            </header>

            <main className="container px-4 pb-8 mx-auto sm:px-6 lg:px-8">
                <section className="mb-8" aria-label="Filtros de búsqueda">
                    <DiscussionCategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </section>

                {loading ? (
                    <section className="py-16 text-center">
                        <p className="text-lg text-gray-600">Cargando discusiones...</p>
                    </section>
                ) : allDiscussions.length === 0 ? (
                    <section className="py-16 text-center">
                        <p className="mb-4 text-xl text-gray-600">
                            No hay discusiones en esta categoría
                        </p>
                        <CreateDiscussionButton />
                    </section>
                ) : (
                    <>
                        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Lista de discusiones">
                            {discussions.map(discussion => (
                                <DiscussionCard
                                    key={discussion.id}
                                    discussion={discussion}
                                    onDeleted={reloadDiscussions}
                                />
                            ))}
                        </section>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
                <ForumRules />
            </main>
        </Layout>
    );
}

export default Forum;