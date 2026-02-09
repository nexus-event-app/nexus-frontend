import { useState, useEffect } from 'react';

export function useCarousel(imagesLength, autoPlay = true, interval = 5000) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoPlay || imagesLength === 0) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % imagesLength);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval, imagesLength]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % imagesLength);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return {
        currentIndex,
        goToPrevious,
        goToNext,
        goToSlide
    };
}