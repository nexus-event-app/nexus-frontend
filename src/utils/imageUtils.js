const BACKEND_URL = 'http://localhost:8080';

export const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;

    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    return `${BACKEND_URL}${imageUrl}`;
};