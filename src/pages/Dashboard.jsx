    import React from 'react';
    import { useAuth } from '../context/AuthContext';
    import { useNavigate } from 'react-router-dom';

    function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
        <header className="bg-white shadow-sm">
            <nav className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-indigo-600">
                Nexus Admin
            </h1>
            
            <menu className="flex items-center gap-4 p-0 m-0 list-none">
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
                Bienvenido, {user?.name}
            </h2>
            <p className="text-gray-600">
                Panel de administración de Nexus - Tech Events Platform
            </p>
            </section>

            {/* Stats Cards */}
            <section className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                Total Eventos
                </h3>
                <p className="text-3xl font-bold text-indigo-600">
                0
                </p>
            </article>

            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                Próximos Eventos
                </h3>
                <p className="text-3xl font-bold text-green-600">
                0
                </p>
            </article>

            <article className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
                <h3 className="mb-2 text-sm font-medium text-gray-600">
                Eventos Pasados
                </h3>
                <p className="text-3xl font-bold text-gray-600">
                0
                </p>
            </article>
            </section>

            <section className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
                Acciones Rápidas
            </h2>
            <menu className="flex gap-4 p-0 m-0 list-none">
                <li>
                <button className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700">
                    Crear Evento
                </button>
                </li>
                <li>
                <button className="px-6 py-3 font-medium text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200">
                    Ver Todos los Eventos
                </button>
                </li>
            </menu>
            </section>

            <section className="p-6 mt-8 border border-blue-100 bg-blue-50 rounded-xl">
            <h2 className="mb-3 text-lg font-bold text-gray-900">
                Tu Información
            </h2>
            <dl className="space-y-2">
                <dt className="text-sm text-gray-600">Email:</dt>
                <dd className="font-medium text-gray-900">{user?.email}</dd>
                
                <dt className="text-sm text-gray-600">Rol:</dt>
                <dd className="font-medium text-gray-900">{user?.role}</dd>
                
                <dt className="text-sm text-gray-600">Cuenta creada:</dt>
                <dd className="font-medium text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES') : 'N/A'}
                </dd>
            </dl>
            </section>
        </main>
        </>
    );
    }

    export default Dashboard;