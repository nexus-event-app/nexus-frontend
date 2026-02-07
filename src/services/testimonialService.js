import axios from 'axios';

const API_URL = 'http://localhost:8080/api/testimonials';

const testimonialService = {

    createTestimonial: async (testimonialData) => {
        const response = await axios.post(API_URL, testimonialData);
        return response.data;
    },

    getAllTestimonials: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getLatestTestimonials: async () => {
        const response = await axios.get(`${API_URL}/latest`);
        return response.data;
    },

    getTestimonialById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    updateTestimonial: async (id, testimonialData) => {
        const response = await axios.put(`${API_URL}/${id}`, testimonialData);
        return response.data;
    },

    deleteTestimonial: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
};

export default testimonialService;