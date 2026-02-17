import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const authService = {

    register: async (name, email, password) => {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password
        });

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }

        return response.data;
    },

    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        });

        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }

        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    initializeToken: () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }
};

export default authService;