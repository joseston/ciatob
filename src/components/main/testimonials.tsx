// src/components/main/testimonials.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonial = {
    content: "Después de muchos intentos fallidos con dietas y tratamientos, decidí probar una nueva alternativa en CIATOB. Desde el primer mes, noté una diferencia real: sin ansiedad, sin restricciones extremas y con resultados sostenibles. Hoy me siento más ligera, activa y segura. Volver a disfrutar de mi ropa y de mi cuerpo ha sido increíble. Gracias a la Dra. Katty Manrique y su equipo por acompañarme con un enfoque profesional y humano.",
    patientInfo: "Paciente, 60 años",
    doctor: "Dra. Katty Manrique ",
    rating: 5
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      }
    }
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <div className="flex justify-end mb-6">
              <div className="flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            
            <div className="text-center mb-6">
              <Quote className="w-12 h-12 text-[#46b1b9]/20 mx-auto mb-4" />
              <p className="text-gray-700 text-lg leading-relaxed italic">
                {testimonial.content}
              </p>
            </div>

            <div className="text-center mt-8 border-t border-gray-100 pt-6">
              <p className="font-semibold text-[#46b1b9] text-lg">{testimonial.patientInfo}</p>
              <p className="text-sm text-gray-500 mt-1">Atendido por {testimonial.doctor}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;