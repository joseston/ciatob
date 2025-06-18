// Hero Section Component
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const loaderProp = ({ src }: { src: string }) => {
  return src;
};

const carouselSlides = [
  {
    id: 'come-inteligente',
    title: 'Paquete - Come Inteligente y Pierde Peso Saludablemente',
    description: 'Este plan está diseñado para guiar a las personas en su proceso de pérdida de peso a través de una alimentación consciente y equilibrada, sin recurrir a dietas extremas o métodos poco saludables. Aprende a comer y sin experimentos.',
    link: '/servicios/come-inteligente-pierde-peso-saludablemente',
    buttonText: 'Ver Paquete Completo',
    image: 'https://scienceluxe.blob.core.windows.net/files/ciatob/nutricion_11zon.webp',
    colors: {
      primary: '#d29113',
      secondary: '#b8781a',
      gradient: 'from-[#d29113] to-[#f4b942]'
    }
  },
  {
    id: 'plan-integral',
    title: 'Paquete - Plan Integral de Peso Saludable',
    description: 'Un plan con evaluación médica especializada, asesoría nutricional, prescripción de la actividad física y apoyo psicológico, para lograr un peso ideal y ser feliz.',
    link: '/servicios/plan-integral-peso-saludable',
    buttonText: 'Ver Plan Integral',
    image: 'https://scienceluxe.blob.core.windows.net/files/ciatob/prescripcion-ejercicio.webp',
    colors: {
      primary: '#398e43',
      secondary: '#2d7235',
      gradient: 'from-[#398e43] to-[#32a852]'
    }
  },
  {
    id: 'equilibrio-total',
    title: 'Paquete - Plan Equilibrio Total y Control de Peso',
    description: 'Un plan de Equilibrio Total y Control de Peso que combina la ciencia de 4 especialidades, ofreciendo una solución equilibrada que busca no solo la pérdida de peso, sino también mejorar la calidad de vida y promover el bienestar general.',
    link: '/servicios/plan-equilibrio-total-control-peso',
    buttonText: 'Ver Plan Equilibrio',
    image: 'https://scienceluxe.blob.core.windows.net/files/ciatob/endocrinologia-1.webp',
    colors: {
      primary: '#02283b',
      secondary: '#1a4a5c',
      gradient: 'from-[#02283b] to-[#4a90a4]'
    }
  }
];

const totalSlides = carouselSlides.length;

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
        <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] max-h-[80vh] flex items-center justify-center">
          {/* Slides de servicios/paquetes */}
          {carouselSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.05
              }}
              transition={{ duration: 0.7 }}
              className={`absolute inset-0 flex items-center justify-center ${currentSlide === index ? 'z-10' : 'z-0'}`}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0 z-0">
                <Image
                  loader={loaderProp}
                  unoptimized
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                {/* Overlay para mejorar legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
              </div>
                <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 md:py-12">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6 md:space-y-8 bg-black/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-white/10"
                >
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                    {slide.title.split(' - ')[0]} -{' '}
                    <span className={`bg-gradient-to-r ${slide.colors.gradient} text-transparent bg-clip-text`}>
                      {slide.title.split(' - ')[1]}
                    </span>
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto px-4 drop-shadow-md">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center pt-4">
                    <Link href={slide.link}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                        style={{
                          background: `linear-gradient(to right, ${slide.colors.primary}, ${slide.colors.secondary})`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `linear-gradient(to right, ${slide.colors.secondary}, ${slide.colors.primary})`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = `linear-gradient(to right, ${slide.colors.primary}, ${slide.colors.secondary})`;
                        }}
                      >
                        {slide.buttonText}
                      </motion.button>
                    </Link>
                    <Link href="/agendar-cita">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-3.5 rounded-lg border-2 border-white/80 text-white font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-sm md:text-base"
                      >
                        Agendar Consulta
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        
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