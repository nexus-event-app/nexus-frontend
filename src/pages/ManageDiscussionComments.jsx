import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/layout/AdminHeader';
import { useDiscussionDetail } from '../hooks/useDiscussionDetail';
import { useComments } from '../hooks/useComments';

function ManageDiscussionComments() {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const {
        discussion,
        comments,
        loading,
        error,
        reloadComments
    } = useDiscussionDetail(id);

    const { deleteComment, deleting } = useComments(id, reloadComments);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId, user.id);
    };

    if (loading) {
        return (
            <>
                <AdminHeader
                    showBackButton={true}
                    backTo="/dashboard/discussions"
                    backLabel="Gestionar Foro"
                />
                <main className="min-h-screen px-4 py-8 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-8">
                    <p className="text-gray-600">Cargando...</p>
                </main>
            </>
        );
    }

    if (error || !discussion) {
        return (
            <>
                <AdminHeader
                    showBackButton={true}
                    backTo="/dashboard/discussions"
                    backLabel="Gestionar Foro"
                />
                <main className="min-h-screen px-4 py-8 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-8">
                    <p className="text-red-600">{error || 'Discusión no encontrada'}</p>
                </main>
            </>
        );
    }

    return (
        <>
            <AdminHeader
                showBackButton={true}
                backTo="/dashboard/discussions"
                backLabel="Gestionar Foro"
            />

            <main className="min-h-screen px-4 py-8 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-8">
                <section className="mb-8">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900">
                        Comentarios de la discusión
                    </h2>
                    <p className="text-gray-600">
                        Modera los comentarios de esta discusión
                    </p>
                </section>

                <section className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                        {discussion.title}
                    </h3>
                    <p className="mb-4 text-sm text-gray-600">
                        Por <strong>{discussion.authorName}</strong> • {formatDate(discussion.createdAt)}
                    </p>
                    <p className="text-gray-700 whitespace-pre-wrap">
                        {discussion.content}
                    </p>
                </section>

                <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                        Comentarios ({comments.length})
                    </h3>

                    {comments.length === 0 ? (
                        <p className="text-gray-600">No hay comentarios en esta discusión.</p>
                    ) : (
                        <ul className="space-y-4">
                            {comments.map(comment => (
                                <li
                                    key={comment.id}
                                    className="p-4 border border-gray-200 rounded-lg"
                                >
                                    <article>
                                        <header className="flex items-start justify-between gap-4 mb-3">
                                            <section>
                                                <p className="font-semibold text-gray-900">
                                                    {comment.authorName}
                                                </p>
                                                <time className="text-sm text-gray-500">
                                                    {formatDate(comment.createdAt)}
                                                </time>
                                            </section>

                                            <button
                                                onClick={() => handleDeleteComment(comment.id)}
                                                disabled={deleting}
                                                className="px-3 py-1 text-sm font-medium text-red-600 transition rounded-lg bg-red-50 hover:bg-red-100 disabled:opacity-50"
                                            >
                                                {deleting ? 'Eliminando...' : 'Eliminar'}
                                            </button>
                                        </header>

                                        <p className="text-gray-700 whitespace-pre-wrap">
                                            {comment.content}
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

export default ManageDiscussionComments;