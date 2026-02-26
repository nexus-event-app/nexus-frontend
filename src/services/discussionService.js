import axios from 'axios';

const API_URL = 'http://localhost:8080/api/discussions';

const discussionService = {
    getAllDiscussions: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getDiscussionById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    getDiscussionsByCategory: async (category) => {
        const response = await axios.get(`${API_URL}/category/${category}`);
        return response.data;
    },

    getMyDiscussions: async (userId) => {
        const response = await axios.get(`${API_URL}/my-discussions`, {
            headers: { 'User-Id': userId }
        });
        return response.data;
    },

    createDiscussion: async (data, userId) => {
        const config = {};
        if (userId) {
            config.headers = { 'User-Id': userId };
        }

        const response = await axios.post(API_URL, data, config);
        return response.data;
    },

    updateDiscussion: async (id, data, userId) => {
        const response = await axios.put(`${API_URL}/${id}`, data, {
            headers: { 'User-Id': userId }
        });
        return response.data;
    },

    deleteDiscussion: async (id, userId) => {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { 'User-Id': userId }
        });
    },

    toggleLike: async (discussionId, userId) => {
        const response = await axios.post(`${API_URL}/${discussionId}/like`, {}, {
            headers: { 'User-Id': userId }
        });
        return response.data;
    }
};

export default discussionService;