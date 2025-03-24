'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/header/header';
import ServiceHeader from './components/service-header';
import ServiceCategories from './components/service-categories';
import ServiceGrid from './components/service-grid';
import useServices from './hooks/use-services';
import { ServiceCardProps } from './types/services';

export default function ServiciosPage() {
  const { services, categories, isLoading } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [filteredServices, setFilteredServices] = useState<ServiceCardProps[]>([]);

  // Cuando cambia la categoría seleccionada o los servicios, actualizar los servicios filtrados
  useEffect(() => {
    if (selectedCategory === 'Todos') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    }
  }, [selectedCategory, services]);

  return (
    <main className="min-h-screen">
      <Header />
      
      <ServiceHeader 
        title="Nuestros Servicios"
        description="Ofrecemos una amplia gama de servicios especializados para el tratamiento integral de la obesidad, combinando diferentes disciplinas médicas y el uso de tecnología avanzada."
      />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#46b1b9]"></div>
          </div>
        ) : (
          <>
            <ServiceCategories 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            
            <ServiceGrid 
              services={filteredServices}
              selectedCategory={selectedCategory}
            />

            {/* Banner promocional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 bg-gradient-to-r from-[#46b1b9]/10 to-[#22616a]/10 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Paquetes integrales para tu bienestar
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Descubre nuestros paquetes especiales que combinan múltiples especialidades para un abordaje completo de la obesidad y sobrepeso.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#46b1b9] to-[#22616a] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Ver paquetes
                    </motion.button>
                  </div>
                  <div className="hidden md:block relative h-60">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#46b1b9] to-[#22616a] opacity-20 rounded-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-[#22616a]">
                        20% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Sección de preguntas frecuentes */}
            <div className="mt-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Preguntas Frecuentes
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Resolvemos tus dudas sobre nuestros servicios y tratamientos
                </p>
              </motion.div>
              
              <div className="space-y-4 max-w-3xl mx-auto">
                {[
                  {
                    question: "¿Cómo puedo agendar una cita para un servicio?",
                    answer: "Puedes agendar una cita fácilmente a través de nuestro sitio web, llamando al número de teléfono de contacto o enviándonos un mensaje por WhatsApp."
                  },
                  {
                    question: "¿Puedo usar seguro médico para estos servicios?",
                    answer: "Trabajamos con las principales aseguradoras médicas. Te recomendamos contactarnos para verificar si tu seguro específico tiene cobertura para nuestros servicios."
                  },
                  {
                    question: "¿Cuánto tiempo debo esperar para ver resultados?",
                    answer: "Los resultados varían según cada persona y el tipo de servicio. En general, con un seguimiento adecuado, nuestros pacientes comienzan a ver cambios positivos entre 2 y 8 semanas."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
      

    </main>
  );
}