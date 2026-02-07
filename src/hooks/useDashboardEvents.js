import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../services/eventService';

export function useDashboardEvents() {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        location: '',
        eventType: '',
        level: '',
        search: ''
    });

    const hasActiveFilters = filters.location || filters.eventType || filters.level || filters.search;
    const displayEvents = hasActiveFilters ? filteredEvents : events;

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [events, filters]);

    const loadEvents = async () => {
        try {
            const [allEvents, upcoming, past] = await Promise.all([
                eventService.getAllEvents(),
                eventService.getUpcomingEvents(),
                eventService.getPastEvents()
            ]);

            setEvents(allEvents);
            setUpcomingEvents(upcoming);
            setPastEvents(past);
        } catch (error) {
            console.error('Error al cargar eventos:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...events];

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchLower) ||
                event.description?.toLowerCase().includes(searchLower) ||
                event.tags?.toLowerCase().includes(searchLower)
            );
        }

        if (filters.location) {
            filtered = filtered.filter(event => event.location === filters.location);
        }

        if (filters.eventType) {
            filtered = filtered.filter(event => event.eventType === filters.eventType);
        }

        if (filters.level) {
            filtered = filtered.filter(event => event.level === filters.level);
        }

        setFilteredEvents(filtered);
    };

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            location: '',
            eventType: '',
            level: '',
            search: ''
        });
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este evento?')) {
            try {
                await eventService.deleteEvent(id);
                loadEvents();
            } catch (error) {
                console.error('Error al eliminar evento:', error);
            }
        }
    };

    const handleEditEvent = (id) => {
        navigate(`/events/edit/${id}`);
    };

    return {
        events,
        displayEvents,
        upcomingEvents,
        pastEvents,
        loading,
        filters,
        hasActiveFilters,
        handleFilterChange,
        clearFilters,
        handleDeleteEvent,
        handleEditEvent
    };
}