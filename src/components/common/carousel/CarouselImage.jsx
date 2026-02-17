import React from 'react';

function CarouselImage({ src, alt, caption }) {
    return (
        <figure className="relative w-full h-full m-0">
            <img
                src={src}
                alt={alt}
                className="object-cover w-full h-full transition-opacity duration-500"
            />
            {caption && (
                <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-3 text-center text-white bg-black bg-opacity-90">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

export default CarouselImage;