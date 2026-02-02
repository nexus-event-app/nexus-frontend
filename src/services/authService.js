    import axios from 'axios';

    const API_URL = 'http://localhost:8080/api/auth';

    const authService = {

    register: async (name, email, password) => {
        const response = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password
        });
        return response.data;
    },


    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, {
        email,
        password
        });
        
        if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        }
        
        return response.data;
    },


    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
    };

    export default authService;