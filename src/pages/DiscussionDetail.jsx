import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CommentCard from '../components/forum/CommentCard';
import CommentForm from '../components/forum/CommentForm';
import { useDiscussionDetail } from '../hooks/useDiscussionDetail';
import { useComments } from '../hooks/useComments';

function DiscussionDetail() {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const {
        discussion,
        comments,
        loading,
        error,
        handleBack,
        reloadComments
    } = useDiscussionDetail(id);

    const {
        commentText,
        setCommentText,
        loading: commentLoading,
        error: commentError,
        deleting,
        createComment,
        deleteComment
    } = useComments(id, reloadComments);

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

    const getCategoryColor = (category) => {
        const colors = {
            AYUDA_TECNICA: 'bg-blue-100 text-blue-800',
            RECURSOS: 'bg-green-100 text-green-800',
            EXPERIENCIAS: 'bg-purple-100 text-purple-800',
            NETWORKING: 'bg-pink-100 text-pink-800',
            GENERAL: 'bg-gray-100 text-gray-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (user) {
            createComment(user.id);
        }
    };

    if (loading) {
        return (
            <Layout>
                <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
                    <p className="text-center text-gray-600">Cargando discusión...</p>
                </main>
            </Layout>
        );
    }

    if (error || !discussion) {
        return (
            <Layout>
                <main className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
                    <p className="text-center text-red-600">{error || 'Discusión no encontrada'}</p>
                    <section className="mt-4 text-center">
                        <button
                            onClick={handleBack}
                            className="text-indigo-600 hover:text-indigo-700"
                        >
                            ← Volver al foro
                        </button>
                    </section>
                </main>
            </Layout>
        );
    }

    return (
        <Layout>
            <main className="container max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <nav className="mb-6 text-sm" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-gray-600">
                        <li><Link to="/" className="hover:text-indigo-600">Inicio</Link></li>
                        <li>/</li>
                        <li><Link to="/foro" className="hover:text-indigo-600">Foro</Link></li>
                        <li>/</li>
                        <li className="text-gray-900">{discussion.title}</li>
                    </ol>
                </nav>

                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-6 text-gray-600 transition hover:text-gray-900"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al foro
                </button>

                {/* Discusión principal */}
                <article className="p-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <header className="mb-6">
                        <span className={`inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full ${getCategoryColor(discussion.category)}`}>
                            {getCategoryLabel(discussion.category)}
                        </span>
                        <h1 className="mb-4 text-3xl font-bold text-gray-900">
                            {discussion.title}
                        </h1>
                        <section className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-2">
                                <span className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-full">
                                    {discussion.authorName.charAt(0).toUpperCase()}
                                </span>
                                <strong>{discussion.authorName}</strong>
                            </span>
                            <time>{formatDate(discussion.createdAt)}</time>
                        </section>
                    </header>

                    <p className="mb-6 text-lg text-gray-700 whitespace-pre-wrap">
                        {discussion.content}
                    </p>

                    <footer className="pt-4 border-t">
                        <p className="text-sm text-gray-600">
                            {comments.length} {comments.length === 1 ? 'respuesta' : 'respuestas'}
                        </p>
                    </footer>
                </article>

                <section className="mb-8">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                        Respuestas ({comments.length})
                    </h2>

                    {comments.length === 0 ? (
                        <p className="p-6 text-center text-gray-600 border border-gray-200 rounded-lg bg-gray-50">
                            Aún no hay respuestas. ¡Sé el primero en participar!
                        </p>
                    ) : (
                        <section className="space-y-4">
                            {comments.map(comment => (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                    canDelete={user && (user.id === comment.authorId || user.role === 'ADMIN')}
                                    onDelete={() => deleteComment(comment.id, user.id)}
                                    deleting={deleting}
                                />
                            ))}
                        </section>
                    )}
                </section>

                <section>
                    <CommentForm
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onSubmit={handleCommentSubmit}
                        loading={commentLoading}
                        error={commentError}
                        isLoggedIn={!!user}
                    />
                </section>
            </main>
        </Layout>
    );
}

export default DiscussionDetail;