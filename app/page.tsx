// app/page.tsx
import { Sidebar } from '@/components/sidebar';
import InteractiveGrid from '../components/InteractiveGrid';
import InfiniteCarousel from '@/components/InfiniteCarousel';

export default function Home() {
  return (
    // Contenedor principal
    <div className="flex min-h-screen bg-black text-white">

      <div className='w-20'>
        <Sidebar />
      </div>

      {/* 2. CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto">

        {/* PRIMERA VISTA: Cuadrícula Full-Screen */}
        <section
          className="
              relative // CLAVE: Permite que los elementos hijos 'absolute' se posicionen respecto a él.
              h-screen 
              flex flex-col 
              overflow-hidden 
            "
        >

          {/* 1. CAPA DE LA CUADRÍCULA (Fondo) */}
          <div
            className="
                flex-1 w-full p-2
              "
          >
            <InteractiveGrid />
          </div>

          {/* 2. CAPA DE CONTENIDO (Frente/Overlay) */}
          <div
            className="
                absolute inset-0 
                flex flex-col items-center justify-center 
                text-center p-8 z-10 
                bg-black/50 
                -translate-y-16
                pointer-events-none // <--- ¡CLAVE AÑADIDA! Ignora clics y hover.
              "
          >
            {/* El texto y el botón ahora deben ser interactivos de nuevo */}
            <h1 className="text-6xl md:text-8xl font-bebas tracking-wider mb-4">
              TERCER TIEMPO
            </h1>
            <p className="max-w-xl text-lg  text-gray-300 mb-8">
              El fútbol no es solo 90 minutos, es emoción, historia y amistad. Tercer Tiempo nace para quienes sienten el fútbol en el corazón.
            </p>

            {/* Para que el botón funcione, debemos re-habilitar los eventos solo en el botón. */}
            <button className="
  group relative overflow-hidden
  px-8 py-3 bg-green-700 text-black font-bold 
  rounded-lg shadow-lg hover:bg-green-500 transition-all duration-300
  pointer-events-auto 
">
              {/* Balón animado */}
              <span className="
    absolute -top-12 left-1/2 -translate-x-1/2
    text-4xl
    group-hover:animate-bounce
    group-hover:top-1/2 group-hover:-translate-y-1/2
    transition-all duration-500
  ">
                ⚽
              </span>

              {/* Texto que se desvanece en hover */}
              <span className="group-hover:opacity-0 transition-opacity duration-300">
                — Alexix O. Andres S.
              </span>
            </button>

          </div>
          <div className='-translate-y-8 '>
            <InfiniteCarousel /></div>


        </section>

        {/* <section className="min-h-screen bg-gray-900 p-16">
            <h2 className="text-2xl font-bebas mb-4">
              Contenido que aparece con el Scroll
            </h2>
            {/* ... otros contenidos ...
          </section>*/}
      </main>
    </div>
  );
}