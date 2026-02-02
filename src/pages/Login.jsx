import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
            <section className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
                <header className="mb-6">
                    <h1 className="mb-2 text-3xl font-bold text-indigo-600">
                        Nexus Admin
                    </h1>
                    <p className="text-gray-600">
                        Inicia sesión para gestionar eventos
                    </p>
                </header>

                <form onSubmit={handleSubmit}>
                    <fieldset disabled={loading} className="space-y-4">
                        <legend className="sr-only">Formulario de inicio de sesión</legend>

                        {error && (
                            <p className="p-3 text-sm text-red-600 rounded-lg bg-red-50" role="alert">
                                {error}
                            </p>
                        )}

                        <label className="block">
                            <span className="block mb-1 font-medium text-gray-700">
                                Email
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="admin@nexus.com"
                                autoComplete="email"
                            />
                        </label>

                        <label className="block">
                            <span className="block mb-1 font-medium text-gray-700">
                                Contraseña
                            </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                placeholder="••••••"
                                autoComplete="current-password"
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    );
}

export default Login;