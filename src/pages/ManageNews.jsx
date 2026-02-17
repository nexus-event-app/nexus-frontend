import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsForm from '../components/news/NewsForm';
import NewsListItem from '../components/news/NewsListItem';
import AdminHeader from '../components/layout/AdminHeader';
import { useNewsForm } from '../hooks/useNewsForm';

function ManageNews() {
    const navigate = useNavigate();
    const {
        news,
        loading,
        showForm,
        editingNews,
        formData,
        formLoading,
        formError,
        formSuccess,
        handleInputChange,
        handleImageChange,
        handleImageRemove,
        handleCreateClick,
        handleEditClick,
        handleSubmit,
        handleCancel,
        handleDelete
    } = useNewsForm();

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
                        Gestionar Noticias
                    </h2>
                    <p className="text-gray-600">
                        Administra las noticias tech para la comunidad junior
                    </p>
                </section>

                <section className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <button
                        onClick={handleCreateClick}
                        className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                        + Crear nueva noticia
                    </button>
                </section>

                {showForm && (
                    <section className="p-6 mb-8 bg-white border border-gray-100 shadow-sm rounded-xl">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">
                            {editingNews ? 'Editar noticia' : 'Crear nueva noticia'}
                        </h3>
                        <NewsForm
                            formData={formData}
                            onChange={handleInputChange}
                            onImageChange={handleImageChange}
                            onImageRemove={handleImageRemove}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            loading={formLoading}
                            isEdit={!!editingNews}
                        />
                    </section>
                )}

                <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                    <h3 className="mb-4 text-xl font-bold text-gray-900">
                        Todas las noticias
                    </h3>

                    {loading ? (
                        <p className="text-gray-600">Cargando noticias...</p>
                    ) : news.length === 0 ? (
                        <p className="text-gray-600">
                            No hay noticias creadas. ¡Crea la primera!
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {news.map(item => (
                                <NewsListItem
                                    key={item.id}
                                    item={item}
                                    onEdit={handleEditClick}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </>
    );
}

export default ManageNews;