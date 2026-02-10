import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comments';

const commentService = {
    getCommentsByDiscussion: async (discussionId) => {
        const response = await axios.get(`${API_URL}/discussion/${discussionId}`);
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
    }
};

export default commentService;