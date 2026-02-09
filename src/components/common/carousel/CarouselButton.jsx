import React from 'react';

function CarouselButton({ direction, onClick, ariaLabel }) {
    const isLeft = direction === 'left';
    const positionClass = isLeft ? 'left-4' : 'right-4';
    const pathD = isLeft ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7';

    return (
        <button
            onClick={onClick}
            className={`absolute p-2 text-white transition -translate-y-1/2 bg-black bg-opacity-50 rounded-full ${positionClass} top-1/2 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white`}
            aria-label={ariaLabel}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pathD} />
            </svg>
        </button>
    );
}

export default CarouselButton;