'use client';

import Image from 'next/image';
import React from 'react';

interface CarouselImage {
  src: string;
  alt: string;
}

// Imágenes para el carrusel (puedes agregar las que quieras)
const carouselImages: CarouselImage[] = [
  { src: '/carousel/1.jpg', alt: 'Imagen 1' },
  { src: '/carousel/2.jpg', alt: 'Imagen 2' },
  { src: '/carousel/3.jpg', alt: 'Imagen 3' },
  { src: '/carousel/4.jpg', alt: 'Imagen 4' },
  { src: '/carousel/5.jpg', alt: 'Imagen 5' },
  { src: '/carousel/6.jpg', alt: 'Imagen 6' },
];

const InfiniteCarousel: React.FC = () => {
  // Duplicamos las imágenes para efecto infinito sin cortes
  const duplicatedImages = [...carouselImages, ...carouselImages];

  return (
    <div className="w-full overflow-hidden bg-black py-8">
      <div className="relative flex">
        {/* Contenedor animado */}
        <div className="flex animate-scroll">
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-4"
              style={{ width: '300px' }} // Ajusta el ancho de cada imagen
            >
              <div className="relative h-48 w-full rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;