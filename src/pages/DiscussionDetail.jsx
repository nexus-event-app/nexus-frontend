import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ForumRules from '../components/forum/ForumRules';
import DiscussionHeader from '../components/forum/DiscussionHeader';
import CommentsList from '../components/forum/CommentsList';
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

    useEffect(() => {
        if (window.location.hash === '#add-response') {
            setTimeout(() => {
                const element = document.getElementById('add-response');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    const textarea = element.querySelector('textarea');
                    if (textarea) {
                        textarea.focus();
                    }
                }
            }, 300);
        }
    }, []);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const userId = user ? user.id : null;
        createComment(userId);
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
                            className="text-indigo-600 transition rounded hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            ← Volver al foro
                        </button>
                    </section>
                </main>
            </Layout>
        );
    }

    const breadcrumbItems = [
        { label: 'Inicio', href: '/' },
        { label: 'Foro', href: '/foro' },
        { label: discussion.title }
    ];

    return (
        <Layout>
            <main className="container max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <Breadcrumbs items={breadcrumbItems} />

                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-600 transition rounded sm:text-base hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al foro
                </button>

                <DiscussionHeader
                    discussion={discussion}
                    commentsCount={comments.length}
                />

                <CommentsList
                    comments={comments}
                    user={user}
                    onDeleteComment={deleteComment}
                    deleting={deleting}
                />

                <section id="add-response" aria-labelledby="add-response-heading">
                    <h2 id="add-response-heading" className="sr-only">Añadir respuesta</h2>
                    <CommentForm
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onSubmit={handleCommentSubmit}
                        loading={commentLoading}
                        error={commentError}
                    />
                </section>

                <ForumRules />
            </main>
        </Layout>
    );
}

export default DiscussionDetail;