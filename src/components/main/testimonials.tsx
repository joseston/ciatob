// src/components/main/testimonials.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const TestimonialsSection = () => {
  const testimonials = [
    {
      content: "Después de muchos intentos fallidos con dietas y tratamientos, decidí probar una nueva alternativa en CIATOB. Desde el primer mes, noté una diferencia real: sin ansiedad, sin restricciones extremas y con resultados sostenibles. Hoy me siento más ligera, activa y segura. Volver a disfrutar de mi ropa y de mi cuerpo ha sido increíble. Gracias a la Dra. Katty Manrique y su equipo por acompañarme con un enfoque profesional y humano.",
      patientInfo: "Paciente, 60 años",
      professional: "Dra. Katty Manrique",
      rating: 5,
      specialistImage: "https://static.scieluxe.com/files/katty-manrique.jpg"
    },
    {
      content: "Llegué a CIATOB por recomendación y desde el primer momento el trato fue excelente. La Lic. Valeria me explicó todo con mucha paciencia y claridad, dándome la confianza que necesitaba. Me sentí muy cómoda, seguir su plan fue fácil y lo mejor es que vi cambios positivos muy pronto. ¡Estoy muy satisfecha y motivada!",
      patientInfo: "Jimena Oblitas",
      professional: "Lic. Valeria Vilchez",
      rating: 5,
      specialistImage: "https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg"
    },
    {
      content: "Me sentí comprendido y muy cómodo con la Lic. Valeria desde el principio. Fue muy clara con mi plan de alimentación y valoro enormemente su ayuda para coordinar con otros especialistas, lo cual fue clave para mi salud. He mejorado notablemente y cambiado mi estilo de vida. Su profesionalismo y apoyo constante son destacables.",
      patientInfo: "José Hugo",
      professional: "Lic. Valeria Vilchez",
      rating: 5,
      specialistImage: "https://static.scieluxe.com/files/valeria-vilchez-ciatob.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto slide every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#46b1b9]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#46b1b9]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Historias de{' '}
            <span className="bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-transparent bg-clip-text">
              Éxito
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce las experiencias de nuestros pacientes y cómo hemos transformado sus vidas.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
            >
              <div className="flex justify-end mb-6">
                <div className="flex">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <Quote className="w-12 h-12 text-[#46b1b9]/20 mx-auto mb-4" />
                <p className="text-gray-700 text-lg leading-relaxed italic">
                  {testimonials[currentIndex].content}
                </p>
              </div>

              <div className="text-center mt-8 border-t border-gray-100 pt-6">
                <p className="font-semibold text-[#46b1b9] text-lg">{testimonials[currentIndex].patientInfo}</p>
                
                {/* Especialista con foto al costado */}
                <div className="flex items-center justify-center mt-2">
                  <Image
                    src={testimonials[currentIndex].specialistImage}
                    alt={testimonials[currentIndex].professional}
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                  <p className="text-sm text-gray-500">Atendido por {testimonials[currentIndex].professional}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-6 px-3">
            <button 
              onClick={prevTestimonial} 
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#46b1b9] transition-all"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#46b1b9] transition-all"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#46b1b9] scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;