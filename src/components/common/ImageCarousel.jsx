import React from 'react';
import { useCarousel } from '../../hooks/useCarousel';
import CarouselImage from './carousel/CarouselImage';
import CarouselButton from './carousel/CarouselButton';
import CarouselIndicators from './carousel/CarouselIndicators';

function ImageCarousel({ images, autoPlay = true, interval = 5000, height = 'h-96' }) {
    const { currentIndex, goToPrevious, goToNext, goToSlide } = useCarousel(
        images.length,
        autoPlay,
        interval
    );

    if (images.length === 0) return null;

    return (
        <section
            className={`relative w-full overflow-hidden bg-gray-100 rounded-lg ${height}`}
            aria-label="Galería de imágenes"
        >
            <CarouselImage
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                caption={images[currentIndex].caption}
            />

            <CarouselButton
                direction="left"
                onClick={goToPrevious}
                ariaLabel="Imagen anterior"
            />

            <CarouselButton
                direction="right"
                onClick={goToNext}
                ariaLabel="Imagen siguiente"
            />

            <CarouselIndicators
                total={images.length}
                currentIndex={currentIndex}
                onIndicatorClick={goToSlide}
            />
        </section>
    );
}

export default ImageCarousel;