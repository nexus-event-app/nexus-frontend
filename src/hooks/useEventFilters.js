    import { useState, useEffect } from 'react';
    import eventService from '../services/eventService';

    export function useEventFilters() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState('upcoming');

    const [filters, setFilters] = useState({
        location: '',
        eventType: '',
        level: '',
        search: ''
    });

    const hasActiveFilters = filters.location || filters.eventType || filters.level || filters.search;
    const displayEvents = hasActiveFilters ? filteredEvents : events;

    useEffect(() => {
        const loadEvents = async () => {
        setLoading(true);
        try {
            let data;
            if (timeFilter === 'upcoming') data = await eventService.getUpcomingEvents();
            else if (timeFilter === 'all') data = await eventService.getAllEvents();
            else if (timeFilter === 'past') data = await eventService.getPastEvents();
            setEvents(data);
        } catch (error) {
            console.error('Error al cargar eventos:', error);
        } finally {
            setLoading(false);
        }
        };
        loadEvents();
    }, [timeFilter]);

    useEffect(() => {
        const applyFilters = () => {
        let filtered = [...events];

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(event =>
            event.title.toLowerCase().includes(searchLower) ||
            event.description?.toLowerCase().includes(searchLower) ||
            event.tags?.toLowerCase().includes(searchLower) ||
            event.location.toLowerCase().includes(searchLower) ||
            event.organizerName?.toLowerCase().includes(searchLower)
            );
        }

        if (filters.location)
            filtered = filtered.filter(event => event.location === filters.location);

        if (filters.eventType)
            filtered = filtered.filter(event => event.eventType === filters.eventType);

        if (filters.level)
            filtered = filtered.filter(event => event.level === filters.level);

        setFilteredEvents(filtered);
        };

        applyFilters();
    }, [events, filters]);

    const handleFilterChange = (filterName, value) =>
        setFilters(prev => ({ ...prev, [filterName]: value }));

    const clearFilters = () =>
        setFilters({ location: '', eventType: '', level: '', search: '' });

    return {
        events,
        displayEvents,
        loading,
        timeFilter,
        setTimeFilter,
        filters,
        hasActiveFilters,
        handleFilterChange,
        clearFilters
    };
    }