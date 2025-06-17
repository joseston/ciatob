// Hero Section Component
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

const carouselImages = [
  "https://scienceluxe.blob.core.windows.net/files/ciatob/prescripcion-ejercicio.webp",
  "https://scienceluxe.blob.core.windows.net/files/ciatob/nutricion_11zon.webp",
  "https://scienceluxe.blob.core.windows.net/files/ciatob/endocrinologia-1.webp",
  "https://scienceluxe.blob.core.windows.net/files/ciatob/endocrinologia-2.webp",
  "https://scienceluxe.blob.core.windows.net/files/ciatob/endocrinologia-3.webp",
  "https://scienceluxe.blob.core.windows.net/files/ciatob/psicologia_11zon.webp",
  "https://scienceluxe.blob.core.windows.net/files/ciatob/hematologia.webp"
];

const totalSlides = carouselImages.length + 1; // +1 para el slide de texto

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Tiempo ligeramente aumentado para mejor UX

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Función optimizada para pausar y reanudar el autoplay
  const pauseAutoPlay = () => {
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000); // Reducido a 8 segundos
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    pauseAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    pauseAutoPlay();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      {/* Carrusel completo */}
      <div className="relative w-full overflow-hidden">
        {/* Contenedor con aspect ratio dinámico */}
        <div className={`relative w-full ${
          currentSlide === 0 
            ? 'min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] flex items-center' 
            : 'h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[80vh] flex items-center justify-center'
        }`}>
          {/* Slide 0: Contenido de texto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === 0 ? 1 : 0,
              scale: currentSlide === 0 ? 1 : 1.05
            }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 flex items-center justify-center ${currentSlide === 0 ? 'z-10' : 'z-0'}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 md:py-12">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-6 md:space-y-8"
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#02283b] leading-tight">
                  Tratamiento Integral de la{' '}
                  <span className="bg-gradient-to-r from-[#02283b] to-slate-600 text-transparent bg-clip-text">
                    Obesidad
                  </span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto px-4">
                  Equipo multidisciplinario especializado en transformar vidas a través de tratamientos personalizados y seguimiento continuo.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-4">
                  <Link href="/agendar-cita">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-lg bg-[#02283b] text-white font-semibold shadow-lg hover:shadow-xl hover:bg-[#02283b]/90 transition-all duration-300 text-sm md:text-base"
                    >
                      Agendar Consulta
                    </motion.button>
                  </Link>
                  <Link href="/servicios">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-300 text-sm md:text-base"
                    >
                      Conoce más
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Slides 1-7: Imágenes médicas */}
        {carouselImages.map((image, index) => (
          <motion.div
            key={index + 1}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index + 1 ? 1 : 0,
              scale: currentSlide === index + 1 ? 1 : 1.02
            }}
            transition={{ duration: 0.7 }}
            className={`absolute inset-0 ${currentSlide === index + 1 ? 'z-10' : 'z-0'}`}
          >
            <div className="relative w-full h-full max-w-[90vw] mx-auto">
              <Image
                loader={loaderProp}
                unoptimized
                src={image}
                alt={`Especialidad médica ${index + 1}`}
                fill
                className="object-contain"
                priority={index === 0}
                sizes="90vw"
              />
            </div>
            {/* Overlay gradiente sutil para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 z-10 pointer-events-none" />
          </motion.div>
        ))}
        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute left-3 md:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#02283b] rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#02283b]/50"
          aria-label="Slide anterior"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-3 md:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-[#02283b] rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#02283b]/50"
          aria-label="Siguiente slide"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 md:space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === currentSlide 
                  ? 'bg-white scale-110 md:scale-125 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80 hover:scale-105'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;