'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

// 1. Tipado para la estructura de las imágenes
interface InteractiveImage {
  id: number;
  src: string;
  alt: string;
}

// Base de logos
const baseLogos: Omit<InteractiveImage, 'id'>[] = [
  { src: '/logos/barcelona.svg', alt: 'FC Barcelona' },
  { src: '/logos/real-madrid.svg', alt: 'Real Madrid CF' },
  { src: '/logos/millonarios.svg', alt: 'Manchester United FC' },
  { src: '/logos/atletico-nacional.svg', alt: 'Liverpool FC' },
  { src: '/logos/bucaramanga.svg', alt: 'FC Bayern Munich' },
  { src: '/logos/deportes-tolima.svg', alt: 'Paris Saint-Germain FC' },
  { src: '/logos/independiente-medellin.svg', alt: 'Juventus FC' },
  { src: '/logos/junior.svg', alt: 'AC Milan' },
  { src: '/logos/arsenal.svg', alt: 'Arsenal FC' },
  { src: '/logos/atletico-madrid.svg', alt: 'Atlético Madrid' },
  { src: '/logos/bayern-munich.svg', alt: 'Bayern Munich' },
  { src: '/logos/borussia-dortmund.svg', alt: 'Borussia Dortmund' },
  { src: '/logos/juventus.svg', alt: 'Juventus' },
  { src: '/logos/inter-milan.svg', alt: 'Inter Milan' },
  { src: '/logos/manchester-city.svg', alt: 'Manchester City' }, 
  { src: '/logos/liverpool.svg', alt: 'Liverpool' },
  { src: '/logos/psg.svg', alt: 'PSG' },
  { src: '/logos/chelsea.svg', alt: 'Chelsea' },
];

// Generamos 98 elementos
const imagesData: InteractiveImage[] = Array.from({ length: 84}, (_, index) => {
    const logo = baseLogos[index % baseLogos.length];
    return {
        id: index + 1,
        src: logo.src,
        alt: logo.alt,
    };
});

/**
 * Componente que muestra una cuadrícula de imágenes con efecto linterna
 */
const InteractiveGrid: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Rastrear posición del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Calcular la intensidad de iluminación basada en la distancia
  const calculateLightIntensity = (index: number): number => {
    const element = itemRefs.current[index];
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return 0;

    // Centro del elemento relativo al contenedor
    const elementCenterX = rect.left - containerRect.left + rect.width / 2;
    const elementCenterY = rect.top - containerRect.top + rect.height / 2;

    // Distancia euclidiana desde el mouse al centro del elemento
    const distance = Math.sqrt(
      Math.pow(mousePos.x - elementCenterX, 2) + 
      Math.pow(mousePos.y - elementCenterY, 2)
    );

    // AUMENTADO: Radio de influencia más grande para iluminar más logos
    const lightRadius = 250;

    // Calcular intensidad (1 = muy cerca, 0 = fuera del radio)
    const intensity = Math.max(0, 1 - (distance / lightRadius));
    
    return intensity;
  };

  return (
    <div ref={containerRef} className="w-full h-full p-0"> 
      
      <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-12 xl:grid-cols-14 gap-x-1 gap-y-4 md:gap-x-2 md:gap-y-6"> 
        {imagesData.map((image: InteractiveImage, index: number) => {
          const intensity = calculateLightIntensity(index);
          
          return (
            <div
              key={image.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="
                relative 
                w-full h-8 sm:h-10 md:h-12 
                flex items-center justify-center 
                cursor-pointer 
                transition-all duration-200 ease-out
              "
              style={{
                // AUMENTADO: Más escala para que se vea más dramático
                transform: `scale(${1 + intensity * 0.25})`,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill 
                sizes="(max-width: 640px) 16.6vw, (max-width: 768px) 11.1vw, 8.3vw" 
                objectFit="contain"
                style={{
                  // AUMENTADO: Más brillo y resplandor
                  filter: `grayscale(${100 - intensity * 100}%) 
                          drop-shadow(0 0 ${intensity * 15}px rgba(255, 255, 255, ${intensity * 1.2}))
                          brightness(${1 + intensity * 0.3})`,
                  // AUMENTADO: Mayor opacidad base y máxima
                  opacity: 0.15 + (intensity * 0.85),
                }}
                className="
                  transition-all duration-200 ease-out
                "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InteractiveGrid;