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
            className="px-6 py-3 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            + Crear nueva discusión
        </button>
    );
}

export default CreateDiscussionButton;