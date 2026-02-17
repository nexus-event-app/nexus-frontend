import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToastContext } from '../context/ToastContext';

export function useLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const { showSuccess, showError } = useToastContext();
    const navigate = useNavigate();

    const validate = () => {
        if (!email.trim()) {
            showError('El email es obligatorio');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('El email no es válido');
            return false;
        }

        if (!password.trim()) {
            showError('La contraseña es obligatoria');
            return false;
        }

        if (password.length < 6) {
            showError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        try {
            await login(email, password);
            showSuccess('✓ Bienvenida de nuevo, Ana!');
            navigate('/dashboard');
        } catch (err) {
            const message = err.response?.data?.message || 'Email o contraseña incorrectos';
            showError(`✕ ${message}`);
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleSubmit
    };
}