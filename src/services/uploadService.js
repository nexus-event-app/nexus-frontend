import axios from 'axios';

const API_URL = 'http://localhost:8080/api/upload';

const uploadService = {
    uploadNewsImage: async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${API_URL}/news-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        return response.data;
    },

    deleteNewsImage: async (fileName) => {
        await axios.delete(`${API_URL}/news-image/${fileName}`, {
            withCredentials: true
        });
    }
};

export default uploadService;