import React from 'react';
import { useNavigate } from 'react-router-dom';

function CreateDiscussionButton() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    const handleClick = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/foro/crear');
        }
    };

    return (
        <button
            onClick={handleClick}
            className="w-full px-8 py-3 text-lg font-medium text-center text-white transition border-2 border-white rounded-lg sm:w-auto hover:bg-white hover:text-indigo-600"

        >
            + Crear nueva discusión
        </button>
    );
}

export default CreateDiscussionButton;