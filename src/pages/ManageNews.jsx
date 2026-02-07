    import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import newsService from '../services/newsService';
    import NewsForm from '../components/news/NewsForm';

    function ManageNews() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        sourceUrl: '',
        imageUrl: '',
        author: '',
        isActive: true
    });
    
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
        const data = await newsService.getAllNews();
        setNews(data);
        } catch (error) {
        console.error('Error al cargar noticias:', error);
        } finally {
        setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCreateClick = () => {
        setEditingNews(null);
        setFormData({
        title: '',
        content: '',
        sourceUrl: '',
        imageUrl: '',
        author: '',
        isActive: true
        });
        setFormError('');
        setFormSuccess('');
        setShowForm(true);
    };

    const handleEditClick = (item) => {
        setEditingNews(item);
        setFormData({
        title: item.title,
        content: item.content || '',
        sourceUrl: item.sourceUrl || '',
        imageUrl: item.imageUrl || '',
        author: item.author || '',
        isActive: item.isActive
        });
        setFormError('');
        setFormSuccess('');
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');
        setFormSuccess('');

        try {
        if (editingNews) {
            await newsService.updateNews(editingNews.id, formData);
            setFormSuccess('Noticia actualizada correctamente');
        } else {
            await newsService.createNews(formData);
            setFormSuccess('Noticia creada correctamente');
        }
        
        await loadNews();
        setTimeout(() => {
            setShowForm(false);
            setFormSuccess('');
        }, 1500);
        } catch (error) {
        setFormError(error.response?.data?.message || 'Error al guardar la noticia');
        } finally {
        setFormLoading(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingNews(null);
        setFormError('');
        setFormSuccess('');
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
        try {
            await newsService.deleteNews(id);
            loadNews();
        } catch (error) {
            console.error('Error al eliminar noticia:', error);
        }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
        });
    };

    return (
        <>
        <header className="bg-white shadow-sm">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-indigo-600">
                Nexus Admin
            </h1>
            
            <menu className="flex items-center gap-4 p-0 m-0 list-none">
                <li>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-700 transition hover:text-indigo-600"
                >
                    Dashboard
                </button>
                </li>
                <li className="text-gray-700">
                {user?.name}
                </li>
                <li>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    Cerrar sesión
                </button>
                </li>
            </menu>
            </nav>
        </header>

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
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={formLoading}
                error={formError}
                success={formSuccess}
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
                    <li key={item.id} className="p-4 transition border border-gray-200 rounded-lg hover:bg-gray-50">
                    <article>
                        <header className="flex items-start justify-between mb-2">
                        <section className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900">
                            {item.title}
                            </h4>
                            {item.author && (
                            <p className="text-sm text-gray-500">
                                Por {item.author}
                            </p>
                            )}
                        </section>
                        <menu className="flex gap-2 p-0 m-0 list-none">
                            <li>
                            <button
                                onClick={() => handleEditClick(item)}
                                className="px-3 py-1 text-sm text-indigo-600 transition rounded hover:bg-indigo-50"
                            >
                                Editar
                            </button>
                            </li>
                            <li>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-1 text-sm text-red-600 transition rounded hover:bg-red-50"
                            >
                                Eliminar
                            </button>
                            </li>
                        </menu>
                        </header>
                        
                        {item.content && (
                        <p className="mb-3 text-gray-600 line-clamp-2">
                            {item.content}
                        </p>
                        )}
                        
                        <dl className="grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
                        <section>
                            <dt className="text-gray-500">Creada:</dt>
                            <dd className="font-medium">{formatDate(item.createdAt)}</dd>
                        </section>
                        <section>
                            <dt className="text-gray-500">Estado:</dt>
                            <dd className={`font-medium ${item.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {item.isActive ? 'Activa' : 'Inactiva'}
                            </dd>
                        </section>
                        {item.sourceUrl && (
                            <section>
                            <dt className="text-gray-500">Fuente:</dt>
                            <dd>
                                <a 
                                href={item.sourceUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:underline"
                                >
                                Ver enlace →
                                </a>
                            </dd>
                            </section>
                        )}
                        </dl>
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

    export default ManageNews;