// src/app/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header/header';
import HeroSection from '@/components/main/hero';
import ServicesSection from '@/components/main/services';
import SpecialistsSection from '@/components/main/specialist';
import {Star} from 'lucide-react';




// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María García",
      role: "Paciente",
      content: "El enfoque integral de CIATOB cambió completamente mi vida. No solo perdí peso, sino que aprendí a mantener un estilo de vida saludable.",
      rating: 5,
    },
    {
      name: "Carlos Rodríguez",
      role: "Paciente",
      content: "El seguimiento personalizado y el apoyo constante del equipo médico fueron clave en mi proceso de transformación.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Historias de Éxito
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce las experiencias de nuestros pacientes y cómo hemos transformado sus vidas.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <SpecialistsSection />
      <TestimonialsSection />

    </main>
  );
}