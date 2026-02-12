import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comments';

const commentService = {
    getCommentsByDiscussion: async (discussionId, userId = null) => {
        const config = userId ? { headers: { 'User-Id': userId } } : {};
        const response = await axios.get(`${API_URL}/discussion/${discussionId}`, config);
        return response.data;
    },

    createComment: async (data, userId) => {
        const response = await axios.post(API_URL, data, {
            headers: { 'User-Id': userId }
        });
        return response.data;
    },

    deleteComment: async (id, userId) => {
        await axios.delete(`${API_URL}/${id}`, {
            headers: { 'User-Id': userId }
        });
    },

    toggleLike: async (commentId, userId) => {
        const response = await axios.post(`${API_URL}/${commentId}/like`, {}, {
            headers: { 'User-Id': userId }
        });
        return response.data;
    }
};

export default commentService;