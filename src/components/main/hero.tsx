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

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#02283b] mb-6">
              Tratamiento Integral de la{' '}
              <span className="bg-gradient-to-r from-[#02283b] to-slate-600 text-transparent bg-clip-text">
                Obesidad
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Equipo multidisciplinario especializado en transformar vidas a través de tratamientos personalizados y seguimiento continuo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/agendar-cita">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg bg-[#02283b] text-white font-semibold shadow-lg hover:shadow-xl hover:bg-[#02283b]/90 transition-all duration-300"
                >
                  Agendar Consulta
                </motion.button>
              </Link>
              <Link href="/servicios">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-300"
                >
                  Conoce más
                </motion.button>
              </Link>
            </div>
          </motion.div>          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Carrusel de imágenes */}
            <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              {/* Imágenes del carrusel */}
              <div className="relative w-full h-full">
                {carouselImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: index === currentSlide ? 1 : 0,
                      scale: index === currentSlide ? 1 : 1.1
                    }}
                    transition={{ duration: 0.7 }}
                    className={`absolute inset-0 ${index === currentSlide ? 'z-10' : 'z-0'}`}
                  >
                    <Image
                      loader={loaderProp}
                      unoptimized
                      src={image}
                      alt={`Especialidad médica ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Botones de navegación */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#02283b] rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Imagen anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-[#02283b] rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Siguiente imagen"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>

              {/* Overlay gradiente para mejor legibilidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
            </div>
          </motion.div>        </div>
      </div>
    </section>
  );
};

export default HeroSection;