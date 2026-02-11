    import React from 'react';
    import CommentCard from './CommentCard';

    function CommentsList({ comments, user, onDeleteComment, deleting }) {
    return (
        <section className="mb-8">
        <h2 className="mb-6 text-xl font-bold text-center text-gray-900 sm:text-2xl">
            💬 Respuestas <span className="text-indigo-600">({comments.length})</span>
        </h2>

        {comments.length === 0 ? (
            <p className="p-8 text-center text-gray-600 border-2 border-gray-200 border-dashed rounded-xl bg-gray-50">
            Aún no hay respuestas. ¡Sé el primero en participar!
            </p>
        ) : (
            <section className="space-y-4" aria-label="Lista de respuestas">
            {comments.map(comment => (
                <CommentCard
                key={comment.id}
                comment={comment}
                canDelete={user && (user.id === comment.authorId || user.role === 'ADMIN')}
                onDelete={() => onDeleteComment(comment.id, user.id)}
                deleting={deleting}
                />
            ))}
            </section>
        )}
        </section>
    );
    }

    export default CommentsList;