export const NEWS_CATEGORIES = {
    DESARROLLO: {
        value: 'DESARROLLO',
        label: 'Desarrollo',
        color: 'bg-blue-50 text-blue-700 border border-blue-200',
        filterColor: 'bg-blue-600 hover:bg-blue-700'
    },
    ENTREVISTAS: {
        value: 'ENTREVISTAS',
        label: 'Entrevistas',
        color: 'bg-purple-100 text-purple-800',
        filterColor: 'bg-purple-600 hover:bg-purple-700'
    },
    NETWORKING: {
        value: 'NETWORKING',
        label: 'Networking',
        color: 'bg-green-100 text-green-800',
        filterColor: 'bg-green-600 hover:bg-green-700'
    },
    RECURSOS: {
        value: 'RECURSOS',
        label: 'Recursos',
        color: 'bg-indigo-100 text-indigo-800',
        filterColor: 'bg-indigo-600 hover:bg-indigo-700'
    },
    GENERAL: {
        value: 'GENERAL',
        label: 'General',
        color: 'bg-gray-100 text-gray-800',
        filterColor: 'bg-gray-600 hover:bg-gray-700'
    }
};

export const getCategoryColor = (category) => {
    return NEWS_CATEGORIES[category]?.color || NEWS_CATEGORIES.GENERAL.color;
};

export const getCategoryLabel = (category) => {
    return NEWS_CATEGORIES[category]?.label || category;
};

export const getCategoryFilterColor = (category) => {
    return NEWS_CATEGORIES[category]?.filterColor || NEWS_CATEGORIES.GENERAL.filterColor;
};

export const getCategoriesArray = () => {
    return Object.values(NEWS_CATEGORIES);
};

export const getCategoriesForFilter = () => {
    return [
        { value: 'TODAS', label: 'Todas', color: 'bg-gray-600 hover:bg-gray-700' },
        ...getCategoriesArray().map(cat => ({
            value: cat.value,
            label: cat.label,
            color: cat.filterColor
        }))
    ];
};