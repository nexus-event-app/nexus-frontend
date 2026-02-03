    import axios from 'axios';

    const API_URL = 'http://localhost:8080/api/events';

    const eventService = {

    createEvent: async (eventData) => {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    },

    getAllEvents: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getEventById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    updateEvent: async (id, eventData) => {
        const response = await axios.put(`${API_URL}/${id}`, eventData);
        return response.data;
    },

    deleteEvent: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },

    getUpcomingEvents: async () => {
        const response = await axios.get(`${API_URL}/upcoming`);
        return response.data;
    },

    getPastEvents: async () => {
        const response = await axios.get(`${API_URL}/past`);
        return response.data;
    },

    getEventsByLocation: async (location) => {
        const response = await axios.get(`${API_URL}/location/${location}`);
        return response.data;
    },

    getEventsByType: async (type) => {
        const response = await axios.get(`${API_URL}/type/${type}`);
        return response.data;
    }
    };

    export default eventService;