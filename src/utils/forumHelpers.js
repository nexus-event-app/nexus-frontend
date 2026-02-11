    export const getCategoryLabel = (category) => {
    const labels = {
        AYUDA_TECNICA: 'Ayuda Técnica',
        RECURSOS: 'Recursos',
        EXPERIENCIAS: 'Experiencias',
        NETWORKING: 'Networking',
        GENERAL: 'General'
    };
    return labels[category] || category;
    };

    export const getCategoryColor = (category) => {
    const colors = {
        AYUDA_TECNICA: 'bg-blue-100 text-blue-800',
        RECURSOS: 'bg-green-100 text-green-800',
        EXPERIENCIAS: 'bg-purple-100 text-purple-800',
        NETWORKING: 'bg-pink-100 text-pink-800',
        GENERAL: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
    };

    export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    };

    export const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Hace unos minutos';
    if (hours < 24) return `Hace ${hours}h`;
    if (days < 7) return `Hace ${days}d`;
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    };