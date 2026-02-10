import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/layout/AdminHeader';
import { useDiscussions } from '../hooks/useDiscussions';
import { useDiscussionActions } from '../hooks/useDiscussionActions';
import DiscussionCategoryFilter from '../components/forum/DiscussionCategoryFilter';

function ManageDiscussions() {
    const navigate = useNavigate();
    const {
        discussions,
        loading,
        selectedCategory,
        handleCategoryChange,
        reloadDiscussions
    } = useDiscussions();

    const { deleteDiscussion, deleting } = useDiscussionActions(reloadDiscussions);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleViewComments = (discussionId) => {
        navigate(`/dashboard/discussions/${discussionId}/comments`);
    };

    const handleDelete = (discussionId) => {
        deleteDiscussion(discussionId, user.id);
    };

    const getCategoryLabel = (category) => {
        const labels = {
            AYUDA_TECNICA: 'Ayuda Técnica',
            RECURSOS: 'Recursos',
            EXPERIENCIAS: 'Experiencias',
            NETWORKING: 'Networking',
            GENERAL: 'General'
        };
        return labels[category] || category;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <>
            <AdminHeader
                showBackButton={true}
                backTo="/dashboard"
                backLabel="Dashboard"
            />

            <main className="min-h-screen px-4 py-8 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-8">
                <section className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        Gestionar Foro
                    </h2>
                    <p className="text-gray-600">
                        Modera las discusiones y comentarios de la comunidad
                    </p>
                </section>

                <section className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <DiscussionCategoryFilter
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </section>

                <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                        Todas las discusiones ({discussions.length})
                    </h3>

                    {loading ? (
                        <p className="text-gray-600">Cargando discusiones...</p>
                    ) : discussions.length === 0 ? (
                        <p className="text-gray-600">
                            No hay discusiones en esta categoría.
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {discussions.map(discussion => (
                                <li
                                    key={discussion.id}
                                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                                >
                                    <article>
                                        <header className="flex items-start justify-between gap-4 mb-3">
                                            <section className="flex-1">
                                                <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                                                    {getCategoryLabel(discussion.category)}
                                                </span>
                                                <h4 className="mb-1 text-lg font-bold text-gray-900">
                                                    {discussion.title}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    Por <strong>{discussion.authorName}</strong> • {formatDate(discussion.createdAt)} • {discussion.commentCount} respuestas
                                                </p>
                                            </section>

                                            <section className="flex gap-2">
                                                <button
                                                    onClick={() => handleViewComments(discussion.id)}
                                                    className="px-3 py-1 text-sm font-medium text-indigo-600 transition rounded-lg bg-indigo-50 hover:bg-indigo-100"
                                                >
                                                    Ver comentarios
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(discussion.id)}
                                                    disabled={deleting}
                                                    className="px-3 py-1 text-sm font-medium text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50"
                                                >
                                                    {deleting ? 'Eliminando...' : 'Eliminar'}
                                                </button>
                                            </section>
                                        </header>

                                        <p className="text-gray-700 line-clamp-2">
                                            {discussion.content}
                                        </p>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </>
    );
}

export default ManageDiscussions;