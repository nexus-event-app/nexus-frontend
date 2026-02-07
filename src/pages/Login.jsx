import React from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useLogin } from '../hooks/useLogin';

function Login() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        error,
        loading,
        handleSubmit
    } = useLogin();

    return (
        <Layout showHeader={false}>
            <main className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
                <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    error={error}
                    loading={loading}
                    onSubmit={handleSubmit}
                />
            </main>
        </Layout>
    );
}

export default Login;