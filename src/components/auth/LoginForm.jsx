import React from 'react';

function LoginForm({
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    onSubmit
}) {
    return (
        <section className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
            <header className="mb-6">
                <h1 className="mb-2 text-3xl font-bold text-indigo-600">
                    Nexus Admin
                </h1>
                <p className="text-gray-600">
                    Inicia sesión para gestionar eventos
                </p>
            </header>

            <form onSubmit={onSubmit}>
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
    );
}

export default LoginForm;