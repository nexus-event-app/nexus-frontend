    import axios from 'axios';

    const API_URL = 'http://localhost:8080/api/news';

    const newsService = {

    createNews: async (newsData) => {
        const response = await axios.post(API_URL, newsData);
        return response.data;
    },

    getAllNews: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getNewsById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    updateNews: async (id, newsData) => {
        const response = await axios.put(`${API_URL}/${id}`, newsData);
        return response.data;
    },

    deleteNews: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },

    getLatestNews: async () => {
        const response = await axios.get(`${API_URL}/latest`);
        return response.data;
    }
    };

    export default newsService;