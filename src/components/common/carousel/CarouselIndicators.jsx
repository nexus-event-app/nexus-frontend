import React from 'react';

function CarouselIndicators({ total, currentIndex, onIndicatorClick }) {
    return (
        <nav className="absolute flex gap-2 -translate-x-1/2 bottom-4 left-1/2" aria-label="Navegación de galería">
            {Array.from({ length: total }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onIndicatorClick(index)}
                    className={`w-3 h-3 rounded-full transition focus:outline-none focus:ring-2 focus:ring-white ${index === currentIndex
                            ? 'bg-white'
                            : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                />
            ))}
        </nav>
    );
}

export default CarouselIndicators;